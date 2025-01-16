import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';

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

interface PageViewDetails {
  path: string;
  referrer: string | null;
}

class LoggingService {
  private static instance: LoggingService;
  private isLogging: boolean = false;
  private logQueue: Array<() => Promise<void>> = [];

  private constructor() {}

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
      console.error('Error processing log queue:', error);
    } finally {
      this.isLogging = false;
      if (this.logQueue.length > 0) {
        await this.processQueue();
      }
    }
  }

  public async logPageView(
    componentName: string,
    sessionId: string,
    onError?: (error: any) => void
  ): Promise<void> {
    const logFunction = async () => {
      try {
        console.log(`[LoggingService] Logging page view for ${componentName}`);
        
        const { data: { user } } = await supabase.auth.getUser();
        
        const clientInfo: ClientInfo = {
          timestamp: new Date().toISOString(),
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          screen: {
            width: window.innerWidth,
            height: window.innerHeight
          },
          userAgent: navigator.userAgent,
          language: navigator.language
        };

        const details: PageViewDetails = {
          path: window.location.pathname,
          referrer: document.referrer || null
        };

        const { error } = await supabase
          .from('interaction_logs')
          .insert({
            profile_id: user?.id || null,
            interaction_type: 'page_view',
            component_name: componentName,
            details,
            metadata: {
              userAgent: navigator.userAgent,
              language: navigator.language,
              screenSize: {
                width: window.innerWidth,
                height: window.innerHeight
              }
            },
            session_id: sessionId,
            client_info: clientInfo
          });

        if (error) {
          console.error('[LoggingService] Error logging page view:', error);
          onError?.(error);
        } else {
          console.log('[LoggingService] Successfully logged page view');
        }
      } catch (error) {
        console.error('[LoggingService] Error in logPageView:', error);
        onError?.(error);
      }
    };

    this.logQueue.push(logFunction);
    await this.processQueue();
  }
}

export const loggingService = LoggingService.getInstance();