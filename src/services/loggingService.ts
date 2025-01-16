import { supabase } from '@/integrations/supabase/client';
import type { Json } from '@/integrations/supabase/types';

interface ClientInfo {
  timestamp: string;
  timezone: string;
  screen: {
    width: number;
    height: number;
  };
  userAgent: string;
  language: string;
}

interface LogEntry {
  profile_id?: string | null;
  interaction_type: string;
  component_name: string;
  details?: Json;
  metadata?: Json;
  performance_metrics?: Json;
  session_id?: string;
  client_info?: Json;
}

class LoggingService {
  private static instance: LoggingService;
  private isLogging: boolean = false;
  private logQueue: Array<() => Promise<void>> = [];

  private constructor() {
    console.log('LoggingService: Initialized');
  }

  public static getInstance(): LoggingService {
    if (!LoggingService.instance) {
      LoggingService.instance = new LoggingService();
    }
    return LoggingService.instance;
  }

  private async processQueue() {
    if (this.isLogging || this.logQueue.length === 0) return;

    this.isLogging = true;
    try {
      const logFunction = this.logQueue.shift();
      if (logFunction) {
        await logFunction();
      }
    } catch (error) {
      console.error('LoggingService: Error processing log queue:', error);
    } finally {
      this.isLogging = false;
      if (this.logQueue.length > 0) {
        await this.processQueue();
      }
    }
  }

  private sanitizeData(obj: any): any {
    if (!obj) return obj;
    
    // Convert Request objects to their basic properties
    if (obj instanceof Request) {
      return {
        url: obj.url,
        method: obj.method,
        headers: Array.from(obj.headers.entries())
      };
    }
    
    // Handle arrays
    if (Array.isArray(obj)) {
      return obj.map(item => this.sanitizeData(item));
    }
    
    // Handle objects
    if (typeof obj === 'object') {
      const sanitized: any = {};
      for (const [key, value] of Object.entries(obj)) {
        sanitized[key] = this.sanitizeData(value);
      }
      return sanitized;
    }
    
    return obj;
  }

  public async logPageView(
    componentName: string,
    sessionId: string,
    onError?: (error: any) => void
  ): Promise<void> {
    const logFunction = async () => {
      try {
        console.log(`LoggingService: Logging page view for ${componentName}`);
        
        const { data: { user } } = await supabase.auth.getUser();
        
        const clientInfo: Json = {
          timestamp: new Date().toISOString(),
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          screen: {
            width: window.innerWidth,
            height: window.innerHeight
          },
          userAgent: navigator.userAgent,
          language: navigator.language
        };

        const logEntry: LogEntry = {
          profile_id: user?.id || null,
          interaction_type: 'page_view',
          component_name: componentName,
          details: this.sanitizeData({
            path: window.location.pathname,
            referrer: document.referrer || null
          }),
          metadata: this.sanitizeData({
            userAgent: navigator.userAgent,
            language: navigator.language,
            screenSize: {
              width: window.innerWidth,
              height: window.innerHeight
            }
          }),
          session_id: sessionId,
          client_info: clientInfo
        };

        const { error } = await supabase
          .from('interaction_logs')
          .insert(logEntry);

        if (error) {
          console.error('LoggingService: Error logging page view:', error);
          onError?.(error);
        } else {
          console.log('LoggingService: Successfully logged page view');
        }
      } catch (error) {
        console.error('LoggingService: Error in logPageView:', error);
        onError?.(error);
      }
    };

    this.logQueue.push(logFunction);
    await this.processQueue();
  }
}

export const loggingService = LoggingService.getInstance();