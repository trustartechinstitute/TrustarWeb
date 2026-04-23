export default function LessonContent({ contentBlocks }: { contentBlocks: any[] }) {
  const renderBlock = (block: any) => {
    switch (block.type) {
      case 'text':
        return <div className="prose prose-navy max-w-none mb-8" dangerouslySetInnerHTML={{ __html: block.content }} />;
      case 'image':
        return (
          <figure className="mb-8 overflow-hidden rounded-2xl border border-surface-3 bg-surface-2 p-4">
            <img src={block.url} alt={block.caption} className="w-full h-auto rounded-xl object-cover" />
            {block.caption && <figcaption className="mt-3 text-center text-xs font-medium text-text-muted italic">{block.caption}</figcaption>}
          </figure>
        );
      case 'video':
        return (
          <div className="aspect-video mb-8 rounded-2xl overflow-hidden border border-surface-3 bg-black">
            <iframe 
              src={block.url} 
              title={block.title} 
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            />
          </div>
        );
      case 'audio':
        return (
          <div className="mb-8 p-6 bg-surface-2 border border-surface-3 rounded-2xl flex items-center gap-6">
            <div className="font-display font-bold text-navy text-sm uppercase tracking-widest">{block.title || "Lesson Audio"}</div>
            <audio controls src={block.url} className="flex-1 h-10" />
          </div>
        );
      case 'slides':
        return (
          <div className="aspect-[4/3] mb-8 rounded-2xl overflow-hidden border border-surface-3 bg-surface-2">
            <iframe src={block.url} title={block.title} className="w-full h-full" />
          </div>
        );
      case 'article':
        return (
          <a href={block.url} target="_blank" rel="noopener noreferrer" className="block mb-8 p-6 card border-baby/20 hover:bg-baby/5 transition-all group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-baby uppercase tracking-widest mb-1">Recommended Reading</p>
                <h4 className="text-xl font-display font-bold text-navy group-hover:text-baby transition-colors">{block.title}</h4>
              </div>
              <div className="w-10 h-10 bg-baby/10 rounded-full flex items-center justify-center text-baby group-hover:bg-baby group-hover:text-navy transition-all">
                <ChevronRight className="w-5 h-5" />
              </div>
            </div>
          </a>
        );
      default:
        return null;
    }
  };

  return (
    <div className="lesson-content">
      {contentBlocks.map((block, i) => (
        <div key={i}>{renderBlock(block)}</div>
      ))}
    </div>
  );
}

import { ChevronRight } from "lucide-react";
