import { Github, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

interface Project {
  title: string;
  description: string;
  link: string;
  code: string;
}

const projects: Project[] = [
  {
    title: 'Project One',
    description: 'Description for project one.',
    link: 'https://example.com/project-one',
    code: 'https://example.com/project-one',
  },
  {
    title: 'Project Two',
    description: 'Description for project two.',
    link: 'https://example.com/project-two',
    code: 'https://example.com/project-one',
  },
  {
    title: 'Project Three',
    description: 'Description for project Three.',
    link: 'https://example.com/project-two',
    code: 'https://example.com/project-one',
  },
  {
    title: 'Project Four',
    description: 'Description for project Four.',
    link: 'https://example.com/project-two',
    code: 'https://example.com/project-one',
  },
];

const Projects = () => {
  return (
    <section id="projects" className="bg-neutral-50">
      <div className="container mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-2">
        {projects.map((project, index) => (
          <motion.div
            initial={{ opacity: 0, translateY: 50 }}
            whileInView={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 1, delay: 0.2 * index, type: 'spring', stiffness: 100 }}
            key={project.title}
            className="m-4 p-4"
          >
            <div className="mb-4 h-60 w-full rounded-xl bg-neutral-100" />
            <h2 className="bg-gradient-to-br from-neutral-700 to-neutral-600 bg-clip-text text-3xl font-bold tracking-wide text-transparent drop-shadow-lg">
              {project.title}
            </h2>
            <p className="max-w-lg text-lg tracking-wide text-neutral-500">{project.description}</p>
            <div className="mt-4 flex gap-4">
              <a
                className="block w-fit cursor-pointer rounded-xl bg-neutral-200/50 p-2 text-neutral-900 transition-colors duration-300 ease-out hover:bg-neutral-700 hover:text-neutral-100 hover:underline"
                href={project.link}
              >
                <Github />
              </a>
              <a
                className="group block w-fit cursor-pointer rounded-xl bg-neutral-200/50 p-2 text-neutral-900 transition-colors duration-300 ease-out hover:bg-neutral-700 hover:text-neutral-100 hover:underline"
                href={project.code}
              >
                <ExternalLink />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export { Projects };
