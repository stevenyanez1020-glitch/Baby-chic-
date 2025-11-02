#!/usr/bin/env python3
"""
Simple HTTP server for serving static files.
Configured for Replit environment with cache control disabled.
"""
import http.server
import socketserver
import os

PORT = 5000
HOST = "0.0.0.0"

class NoCacheHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """HTTP request handler with cache control disabled."""
    
    def end_headers(self):
        """Add cache control headers to prevent caching."""
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    with socketserver.TCPServer((HOST, PORT), NoCacheHTTPRequestHandler) as httpd:
        httpd.allow_reuse_address = True
        print(f"Server running at http://{HOST}:{PORT}/")
        print("Press Ctrl+C to stop the server")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")
