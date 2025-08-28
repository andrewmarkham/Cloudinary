interface AuthConfig {
    username: string;
    password: string;
}

class HttpClient {
  private authConfig: AuthConfig;

  public constructor(authConfig: AuthConfig) {
    this.authConfig = authConfig;
  }

  private async request<T>(method: string, url: string, data?: any, config?: RequestInit): Promise<T> {
    const headers: Record<string, string> = {
      ...(config?.headers as Record<string, string> || {}),
      Authorization: 'Basic ' + Buffer.from(`${this.authConfig.username}:${this.authConfig.password}`)
        .toString('base64'),
    };
    if (data && (method === 'POST' || method === 'PUT')) {
      headers['Content-Type'] = 'application/json';
    }
    const response = await fetch(url, {
      method,
      headers,
      body: data ? JSON.stringify(data) : undefined,
      ...config,
    });
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    return response.json() as T;
  }

  public async get<T = any>(url: string, config?: RequestInit): Promise<T> {
    return this.request<T>('GET', url, undefined, config);
  }

  public async post<T = any>(url: string, data?: any, config?: RequestInit): Promise<T> {
    return this.request<T>('POST', url, data, config);
  }

  public async put<T = any>(url: string, data?: any, config?: RequestInit): Promise<T> {
    return this.request<T>('PUT', url, data, config);
  }

  public async delete<T = any>(url: string, config?: RequestInit): Promise<T> {
    return this.request<T>('DELETE', url, undefined, config);
  }
}

export default HttpClient;
