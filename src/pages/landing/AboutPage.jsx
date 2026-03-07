import { BarChart3, Globe, Shield, Zap } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Hero Section */}
      <section className="text-center mb-20">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
          Strucify URL Shortener
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A high-performance, enterprise-grade link management system designed
          for 100,000+ hits.
        </p>
      </section>

      {/* Feature Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-20">
        <div className="p-6 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
          <Zap className="w-10 h-10 text-blue-500 mb-4" />
          <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
          <p className="text-muted-foreground">
            Built with a high-performance Java Spring Boot backend and Base62
            encoding for the shortest links possible.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
          <BarChart3 className="w-10 h-10 text-green-500 mb-4" />
          <h3 className="text-xl font-bold mb-2">Real-time Analytics</h3>
          <p className="text-muted-foreground">
            Track clicks, IP addresses, and user agents to understand your
            audience engagement in real-time.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
          <Shield className="w-10 h-10 text-purple-500 mb-4" />
          <h3 className="text-xl font-bold mb-2">Secure & Reliable</h3>
          <p className="text-muted-foreground">
            Enterprise-level security with PostgreSQL persistence and secure
            redirection protocols.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
          <Globe className="w-10 h-10 text-orange-500 mb-4" />
          <h3 className="text-xl font-bold mb-2">Global Reach</h3>
          <p className="text-muted-foreground">
            Seamlessly redirect users from anywhere in the world to your
            destination URLs instantly.
          </p>
        </div>
      </div>

      {/* Tech Stack Footer */}
    </div>
  );
};

export default AboutPage;
