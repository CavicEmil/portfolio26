export default function DesktopProjectRow({ project, onEnter, onLeave, onOpen, refs}) {
    return (
        <div
            key={project.id}
            className="relative w-full h-[13vh] cursor-pointer py-6"
            onMouseEnter={() => onEnter(project.id)}
            onMouseLeave={() => onLeave(project.id)}
        >
            <button
                data-cursor="se mere"
                onClick={() => onOpen(project.id)}
                className="relative block text-left overflow-hidden h-[52px]"
                
            >
                <span
                    ref={(el) => (refs.defaultTitleRefs.current[project.id] = el)}
                    className="block font-epic text-[48px] text-white uppercase leading-none"
                >
                    {project.title}
                </span>
                <span
                    ref={(el) => (refs.hoverTitleRefs.current[project.id] = el)}
                    className="block font-bodoni text-[48px] text-white uppercase pt-[2px] absolute top-full left-0"
                >
                    {project.title}
                </span>
            </button>
            <div
                ref={(el) => (refs.tagsRefs.current[project.id] = el)}
                className="font-body text-[28px] text-white"
                >
                {project.tags.join(' | ')}
            </div>
            <img
                ref={(el) => (refs.previewRefs.current[project.id] = el)}
                src={project.preview}
                alt={project.title}
                style={{ left: '-50vw' }}
                className="absolute top-0 -translate-y-1/2 max-w-[40vw] max-h-[40vh] object-contain rounded-lg w-auto pointer-events-none"
            />
        </div>
    )
}