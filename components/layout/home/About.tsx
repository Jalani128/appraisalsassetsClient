import { ArrowRight, Layers, ShieldCheck, Sparkles } from "lucide-react";

export default function About() {
  return (
    <section className="bg-slate-50 text-slate-900 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-4 py-2 text-sm font-medium">
              Built for modern property teams
            </span>
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                A smarter way to scale property decisions with startup speed.
              </h2>
              <p className="max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                We combine market-leading valuation data, investor-grade analytics, and expert advisory into a single platform designed for real estate teams, founders, and brokers.
                Get faster decisions, clearer insights, and confident outcomes across every transaction.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "AI-backed insights",
                  description: "Real-time market intelligence and valuation signals tailored for Dubai property portfolios.",
                  icon: <Sparkles className="h-5 w-5" />,
                },
                {
                  title: "Secure collaboration",
                  description: "Encrypted workflows for deal teams, advisors, and stakeholders with clear approvals.",
                  icon: <ShieldCheck className="h-5 w-5" />,
                },
              ].map((item) => (
                <div key={item.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <button className="inline-flex items-center justify-center rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-900">
                Explore our approach
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
              <a className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100 transition" href="#contact">
                Talk with an advisor
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 p-6 text-white shadow-2xl ring-1 ring-white/10">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
                Rapid property outcomes
              </p>
              <h3 className="mt-4 text-2xl font-semibold leading-tight">
                Launch deals faster with confident property intelligence.
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                Use a modern platform that brings pipeline clarity, valuation accuracy, and expert guidance together in one place.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  { title: "95%", label: "Faster advisory cycles" },
                  { title: "24/7", label: "Market watch and alerts" },
                ].map((item) => (
                  <div key={item.title} className="rounded-3xl bg-slate-900/80 p-4">
                    <p className="text-3xl font-semibold">{item.title}</p>
                    <p className="mt-2 text-sm text-slate-400">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Data-first strategy",
                  description: "Turn market signals into action with intuitive dashboards and valuation reports.",
                  icon: <Layers className="h-5 w-5" />,
                },
                {
                  title: "Startup-ready support",
                  description: "Built to scale from initial discovery to large portfolio transactions.",
                  icon: <ShieldCheck className="h-5 w-5" />,
                },
              ].map((item) => (
                <div key={item.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4">
                    {item.icon}
                  </div>
                  <h4 className="text-base font-semibold text-slate-900 mb-2">
                    {item.title}
                  </h4>
                  <p className="text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
