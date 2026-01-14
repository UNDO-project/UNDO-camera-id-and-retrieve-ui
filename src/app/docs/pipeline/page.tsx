import { Cpu, Search, Image as ImageIcon, CheckCircle, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Identification Pipeline | cIDaR Docs',
  description: 'Technical deep dive into the cIDaR identification workflow.',
};

export default function PipelineDocsPage() {
  const steps = [
    {
      title: 'Image Pre-processing',
      description:
        'The uploaded image is resized and normalized. Metadata like resolution and aspect ratio are extracted.',
      icon: ImageIcon,
    },
    {
      title: 'Object Detection (YOLOv8)',
      description:
        'A custom-trained YOLOv8 model scans the image to locate security cameras. It outputs bounding boxes and confidence scores.',
      icon: Search,
    },
    {
      title: 'Feature Extraction',
      description:
        'Detected camera regions are passed through a deep neural network to generate unique 512-dimensional vector embeddings.',
      icon: Cpu,
    },
    {
      title: 'Vector Matching',
      description:
        'The embeddings are matched against our catalog using FAISS (Facebook AI Similarity Search) for sub-millisecond retrieval.',
      icon: CheckCircle,
    },
  ];

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">Identification Pipeline</h1>
        <p className="text-muted-foreground text-lg">
          cIDaR uses a multi-stage computer vision pipeline to transform raw pixels into structured
          camera data.
        </p>
      </div>

      <div className="before:from-primary/50 before:via-muted relative space-y-12 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-gradient-to-b before:to-transparent sm:before:ml-[2.25rem]">
        {steps.map((step, index) => (
          <div key={index} className="relative flex items-start gap-6 sm:gap-10">
            <div className="bg-primary text-primary-foreground relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full shadow-lg sm:h-12 sm:w-12">
              <step.icon className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div className="pt-1">
              <h3 className="mb-2 text-xl font-bold">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              {index < steps.length - 1 && (
                <div className="text-primary mt-4 flex items-center text-sm font-medium">
                  Next Step <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <section className="mt-20 space-y-6">
        <h2 className="text-2xl font-bold">Accuracy & Confidence</h2>
        <p className="text-muted-foreground leading-relaxed">
          The pipeline returns a <strong>Confidence Score</strong> for the detection and a
          <strong>Similarity Score</strong> for the match.
        </p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="bg-muted/50 rounded-xl border p-6">
            <h4 className="mb-2 font-bold">Detection Confidence</h4>
            <p className="text-muted-foreground text-sm">
              How certain the YOLOv8 model is that the detected object is actually a camera. We
              typically filter out results below 0.3.
            </p>
          </div>
          <div className="bg-muted/50 rounded-xl border p-6">
            <h4 className="mb-2 font-bold">Match Similarity</h4>
            <p className="text-muted-foreground text-sm">
              Calculated via cosine similarity between the image embedding and the catalog
              embedding. 1.0 is an exact visual match.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
