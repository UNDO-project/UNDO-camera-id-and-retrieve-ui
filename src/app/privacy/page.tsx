import { Shield, Eye, Trash2, Server } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/components';

export const metadata = {
  title: 'Privacy | cIDaR',
  description: 'Privacy information for the cIDaR research project.',
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">Privacy</h1>
        <p className="text-muted-foreground text-lg sm:text-xl">
          cIDaR is designed with privacy in mind. We keep no logs and your interactions with this
          research tool remain anonymous.
        </p>
      </div>

      <div className="grid gap-8">
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Our Approach</h2>
          <p className="text-muted-foreground leading-relaxed">
            As a research project exploring computer vision techniques, we have no interest in
            tracking users or collecting personal data. The tool exists to experiment with camera
            identification not to monitor who uses it or how.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-lg">
                  <Eye className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">No Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  We don&apos;t use analytics, cookies, or any tracking mechanisms. Your usage
                  patterns are not recorded or analyzed.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-lg">
                  <Shield className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">No Logs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Server logs are disabled. We don&apos;t record IP addresses, timestamps, or any
                  information that could identify you.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-6 pt-8">
          <h2 className="text-3xl font-bold">Uploaded Content</h2>
          <p className="text-muted-foreground leading-relaxed">
            When you upload images or videos for camera identification, here&apos;s what happens:
          </p>
          <div className="grid gap-6">
            <div className="flex gap-4">
              <div className="bg-muted flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
                <Server className="text-primary h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Processing</h3>
                <p className="text-muted-foreground">
                  Your uploads are processed in memory to detect and identify cameras. The analysis
                  happens on our servers but is not stored permanently.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-muted flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
                <Trash2 className="text-primary h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Deletion</h3>
                <p className="text-muted-foreground">
                  Uploaded images and videos are automatically deleted after processing. We
                  don&apos;t retain copies of your files or the detection results.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-muted/30 mt-8 rounded-2xl p-8">
          <h2 className="mb-4 text-2xl font-bold">Third-Party Services</h2>
          <p className="text-muted-foreground leading-relaxed">
            The frontend may be hosted on platforms that have their own infrastructure. While we
            don&apos;t collect data ourselves, standard web hosting may involve minimal
            infrastructure logging outside our control. For maximum privacy, consider self-hosting
            the application using the open-source code.
          </p>
        </section>

        <section className="pt-8">
          <h2 className="mb-4 text-2xl font-bold">Questions</h2>
          <p className="text-muted-foreground leading-relaxed">
            If you have questions about privacy or how your data is handled, feel free to reach out
            through the project&apos;s GitHub repository or contact the UNDO team directly.
          </p>
        </section>
      </div>
    </div>
  );
}
