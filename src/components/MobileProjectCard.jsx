export default function MobileProjectCard({ project, onOpen }) {
  return (
        <button
            onClick={onOpen}
            className="relative w-dvw h-[30vh] overflow-hidden text-left "
        >
            <img
                src={project.preview}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />

            <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="font-epic text-[32px] text-white uppercase leading-none">
                    {project.title}
                </h3>
                <p className="font-body text-[16px] text-white/80 mt-2">
                    {project.tags.join(' | ')}
                </p>
            </div>
        </button>
  );
}