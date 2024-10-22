import React, { useState } from "react";
// import { Project } from "../interfaces";
import { projects } from "../data";

const allCategories = Array.from(
  new Set(projects.flatMap((project) => project.categories))
).sort();

const ProjectList: React.FC = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      project.categories.some((cat) => selectedCategories.includes(cat));

    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Open Source Christian Projects
      </h1>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search projects..."
          className="border rounded p-2 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Category Filters */}
      <div className="mb-4">
        <h2 className="font-semibold mb-2">Filter by Categories:</h2>
        <div className="flex flex-wrap">
          {allCategories.map((category) => (
            <label key={category} className="mr-4 mb-2">
              <input
                type="checkbox"
                value={category}
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="mr-1"
              />
              {category}
            </label>
          ))}
        </div>
      </div>

      {/* Project List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <div
              key={project.name}
              className="border p-4 rounded shadow hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-2">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {project.name}
                </a>
              </h3>
              <p className="text-gray-700">{project.description}</p>
              <div className="mt-2">
                {project.categories.map((category) => (
                  <span
                    key={category}
                    className="inline-block bg-gray-200 text-gray-800 text-xs px-2 py-1 mr-2 mb-2 rounded-full"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No projects found.</p>
        )}
      </div>
    </div>
  );
};

export default ProjectList;
