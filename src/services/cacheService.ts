import { CACHE_KEYS } from '@/api/config';

interface CacheItem<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

class CacheService {
  private static instance: CacheService;
  private cache: Map<string, CacheItem<unknown>>;

  private constructor() {
    this.cache = new Map();
    console.log('CacheService: Initialized');
  }

  public static getInstance(): CacheService {
    if (!CacheService.instance) {
      CacheService.instance = new CacheService();
    }
    return CacheService.instance;
  }

  set<T>(key: string, data: T, ttlMs: number): void {
    const timestamp = Date.now();
    const expiresAt = timestamp + ttlMs;
    
    console.log(`CacheService: Setting cache for ${key}, expires in ${ttlMs}ms`);
    
    this.cache.set(key, {
      data,
      timestamp,
      expiresAt,
    });
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key) as CacheItem<T> | undefined;
    
    if (!item) {
      console.log(`CacheService: Cache miss for ${key}`);
      return null;
    }

    if (Date.now() > item.expiresAt) {
      console.log(`CacheService: Cache expired for ${key}`);
      this.cache.delete(key);
      return null;
    }

    console.log(`CacheService: Cache hit for ${key}`);
    return item.data;
  }

  invalidate(key: string): void {
    console.log(`CacheService: Invalidating cache for ${key}`);
    this.cache.delete(key);
  }

  clear(): void {
    console.log('CacheService: Clearing all cache');
    this.cache.clear();
  }
}

export const cacheService = CacheService.getInstance();