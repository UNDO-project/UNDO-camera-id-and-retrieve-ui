import { Terminal, Laptop, Rocket, FileCode, CheckCircle2 } from 'lucide-react';
import { Button } from '@/ui/components';
import Link from 'next/link';

export const metadata = {
  title: 'Getting Started | cIDaR Docs',
  description: 'Learn how to set up the cIDaR frontend for development.',
};

export default function GettingStartedPage() {
  const steps = [
    {
      title: 'Clone the Repository',
      description: 'Get the source code from GitHub.',
      command: 'git clone https://github.com/your-org/cidar-frontend.git',
      icon: Laptop,
    },
    {
      title: 'Install Dependencies',
      description: 'Use npm to install all required packages.',
      command: 'npm install',
      icon: FileCode,
    },
    {
      title: 'Configure Environment',
      description: 'Set up your local environment variables.',
      command: 'cp .env.example .env.local',
      icon: Terminal,
    },
    {
      title: 'Run Development Server',
      description: 'Start the Next.js dev server.',
      command: 'npm run dev',
      icon: Rocket,
    },
  ];

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">Getting Started</h1>
        <p className="text-muted-foreground text-lg">
          Follow these steps to set up the cIDaR frontend on your local machine.
        </p>
      </div>

      <div className="space-y-10">
        {steps.map((step, index) => (
          <section key={index} className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-lg font-bold">
                {index + 1}
              </div>
              <h2 className="text-2xl font-bold">{step.title}</h2>
            </div>
            <p className="text-muted-foreground ml-11">{step.description}</p>
            <div className="bg-muted group ml-11 flex items-center justify-between rounded-lg border p-4 font-mono text-sm">
              <code>{step.command}</code>
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 transition-opacity group-hover:opacity-100"
              >
                Copy
              </Button>
            </div>
          </section>
        ))}

        <section className="mt-16 rounded-2xl border border-green-500/20 bg-green-500/5 p-8">
          <div className="flex gap-4">
            <CheckCircle2 className="mt-1 h-6 w-6 text-green-600" />
            <div>
              <h3 className="mb-2 text-xl font-bold">Verification</h3>
              <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                Once the server is running, navigate to{' '}
                <code className="rounded bg-green-500/10 px-1">http://localhost:3000</code>. You
                should see the landing page. Check the health indicator in the header to ensure the
                backend connection is active.
              </p>
              <Button asChild size="sm">
                <Link href="/">Go to Home</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
