import SwiftUI
import WebKit

struct WebView: UIViewRepresentable {
    func makeUIView(context: Context) -> WKWebView {
        let config = WKWebViewConfiguration()
        config.allowsInlineMediaPlayback = true
        config.mediaTypesRequiringUserActionForPlayback = []
        
        let webView = WKWebView(frame: .zero, configuration: config)
        
        // Load injected script
        if let scriptPath = Bundle.main.path(forResource: "InjectedScript", ofType: "js"),
           let scriptContent = try? String(contentsOfFile: scriptPath) {
            let userScript = WKUserScript(source: scriptContent, injectionTime: .atDocumentStart, forMainFrameOnly: false)
            webView.configuration.userContentController.addUserScript(userScript)
        }
        
        if let url = URL(string: "https://www.instagram.com") {
            webView.load(URLRequest(url: url))
        }
        
        return webView
    }
    
    func updateUIView(_ uiView: WKWebView, context: Context) {}
}
