import data from "../content/site.json";
import { getCollection } from "astro:content";
import { withBasePaths } from "./paths";

export const site = withBasePaths(data);

/** Projects in display order, used by the carousel and the case study pages. */
export async function getProjects() {
  const all = await getCollection("projects");
  return all
    .map((project) => ({ ...project, data: withBasePaths(project.data) }))
    .sort((a, b) => a.data.order - b.data.order);
}
