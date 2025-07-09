export interface Project {
  id: string; // Used for the URL slug (e.g., /portfolio/my-first-project)
  title: string;
  summary: string; // Brief description for the main portfolio page
  thumbnail: string; // Path to the thumbnail image (e.g., /images/project1-thumb.jpg)
  images: string[]; // Array of paths to images for the detailed project page
  description: string; // Detailed description for the dedicated project page
}

export const projects: Project[] = [
  {
    id: "3d-model-design",
    title: "3D-modell design",
    summary: "Se prosjekter innen 3D-modellering og design",
    thumbnail: "/Artboard 1@3x.png",
    images: ["/Artboard 1@3x.png"], // Add more image paths as needed
    description: "Here you can find a detailed description of my 3D model design projects. This includes various design aspects, software used, and challenges overcome. I've worked on diverse projects ranging from architectural visualizations to product prototypes.",
  },
  {
    id: "ikt-setup",
    title: "IKT Setup",
    summary: "Se prosjekter innen IKT-oppsett og løsninger",
    thumbnail: "/500x500 logo.png",
    images: ["/500x500 logo.png"], // Add more image paths as needed
    description: "This section details my experience with ICT setup and solutions. I've handled network configurations, server management, and system integrations for various clients, ensuring robust and efficient IT infrastructures.",
  },
  {
    id: "3d-printing",
    title: "3D-utskrift",
    summary: "Se prosjekter innen 3D-printing og prototyping",
    thumbnail: "/olsen3d-profile-logo.png",
    images: ["/olsen3d-profile-logo.png"], // Add more image paths as needed
    description: "Here you will find examples of my 3D printing and prototyping work. I specialize in rapid prototyping, creating functional and aesthetic models using various materials and printing technologies. Each project demonstrates a unique challenge and solution.",
  },
];