    export default function Section({ section, panelRef }) {
        return (
            <div className="w-[90vw] h-full flex-shrink-0 flex items-center gap-16 px-24">
            {section.media && section.media.length > 1 && <MediaStack media={section.media} panelRef={panelRef} />}

            {section.media && section.media.length === 1 && (
                isVideoFile(section.media[0])
                ? <VideoPlayer src={section.media[0]} />
                : <img src={section.media[0]} className="w-[40vw] h-[70vh] object-cover rounded-lg flex-shrink-0" />
            )}

            {section.graph && (
                <div className="w-[40vw] flex-shrink-0 font-body text-white">
                <h3 className="font-bodoni text-[28px] text-offwhite mb-4">{section.graph.title}</h3>
                <ul className="mb-6">
                    {section.graph.points.map((p) => <li key={p}>{p}</li>)}
                </ul>
                <p>{section.graph.conclusion}</p>
                </div>
            )}

            <div className="flex-1 font-body text-white">
                <p className="text-[20px] leading-relaxed">{section.text}</p>
                {section.links && (
                <div className="flex flex-col gap-2 mt-6">
                    {section.links.map((l) => (
                        <a
                            key={l.link}
                            href={l.link}
                            target="_blank"
                            rel="noreferrer"
                            className="font-bodoni text-offwhite text-[16px] hover:text-accent-red transition-colors"
                        >
                            {l.label}
                        </a>
                    ))}
                </div>
                )}
            </div>
            </div>
        );
        }