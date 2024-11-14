import Organization from "../models/organizationModel";

export const fetchOrganizationNames = async (): Promise<string[]> => {
  const organizations = await Organization.find({}, "name");

  const organizationNames = organizations.map((org) => {
    const name = org.name;
    return name.startsWith("IDF") ? "IDF" : name;
  });

  return [...new Set(organizationNames)];
};