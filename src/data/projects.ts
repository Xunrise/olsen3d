export interface Project {
  id: string; // Used for the URL slug (e.g., /portfolio/my-first-project)
  title: string;
  summary: string; // Brief description for the main portfolio page
  thumbnail: string; // Path to the thumbnail image (e.g., /images/project1-thumb.jpg)
  images: string[]; // Array of paths to images for the detailed project page
  description: string; // Detailed description for the dedicated project page
}

export interface Category {
  id: string;
  title: string;
  summary: string;
  thumbnail: string;
  description: string;
  projects: Project[];
}

export const modelProjects: Project[] = [
  {
    id: "latch",
    title: "latch",
    summary: "made a latch",
    thumbnail: "/3d prints/latch/CAT top.png",
    description: "modelled and made a latch replacement",
    images: [
      "/3d prints/latch/CAD top.png",
      "/3d prints/latch/CAD bottom.png",
      "/3d prints/latch/male.png",
      "/3d prints/latch/female.png",
    ],
  },
];

export const iktProjects: Project[] = [
  {
    id: "pcbuild",
    title: "PC Build",
    summary: "Built a pc for a customer",
    thumbnail: "/pc build/angle 1.png",
    description:
      "Built a custom pc, recommended parts, etc using this and that part",
    images: ["/pc build/angle 1.png", "/pc build/angle 2.png"],
  },
];
//make these into lists instead
export const printProjects: Project[] = [
  {
    id: "bobil",
    title: "Bobil door handle",
    summary: "3D Printed a replacement door handle",
    description:
      "3D Printed a replacement door handle for xyz bobil, saving xyz in costs for the customer. Printed in PLA, took 1 day",
    thumbnail: "/3dprints/bobil door.png",
    images: ["/3d prints/bobil door.png", "/3d prints/can holder bottom.png"],
  },
  {
    id: "can holder",
    title: "can holde",
    summary: "can holde",
    description:
      "3D Printed a replacement door handle for xyz bobil, saving xyz in costs for the customer. Printed in PLA, took 1 day",
    thumbnail: "/3d prints/can holder.png",
    images: ["/3d prints/can holder.png", "/3d prints/can holder bottom.png"],
  },
  {
    id: "filament stand",
    title: "filament stand",
    summary: "3D Printed a filament stand",
    description:
      "3D Printed a replacement door handle for xyz bobil, saving xyz in costs for the customer. Printed in PLA, took 1 day",
    thumbnail: "/3d prints/filament stand.png",
    images: ["/3d prints/filament stand.png"],
  },
];

export const categories: Category[] = [
  {
    id: "3d-model-design",
    title: "3D-modell design",
    summary: "Se prosjekter innen 3D-modellering og design",
    thumbnail: "/3d prints/latch/CAD top.png",
    projects: modelProjects,
    description:
      "Here you can find a detailed description of my 3D model design projects. This includes various design aspects, software used, and challenges overcome. I've worked on diverse projects ranging from architectural visualizations to product prototypes.",
  },
  {
    id: "ikt-setup",
    title: "IKT Setup",
    summary: "Se prosjekter innen IKT-oppsett og løsninger",
    thumbnail: "/pc build/angle 1.png",
    projects: iktProjects,
    description:
      "This section details my experience with ICT setup and solutions. I've handled network configurations, server management, and system integrations for various clients, ensuring robust and efficient IT infrastructures.",
  },
  {
    id: "3d-printing",
    title: "3D-utskrift",
    summary: "Se prosjekter innen 3D-printing og prototyping",
    thumbnail: "/3d prints/bobil door.png",
    projects: printProjects,
    description:
      "Here you will find examples of my 3D printing and prototyping work. I specialize in rapid prototyping, creating functional and aesthetic models using various materials and printing technologies. Each project demonstrates a unique challenge and solution.",
  },
];
