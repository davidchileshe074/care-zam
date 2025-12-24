import api from "./api";

// Volunteers
export const createVolunteer = async (volunteerData) => {
    return await api.post("/volunteers", volunteerData);
};

export const getVolunteers = async () => {
    return await api.get("/volunteers");
};

// Sponsors
export const createSponsor = async (sponsorData) => {
    return await api.post("/sponsors", sponsorData);
};

export const getSponsors = async () => {
    return await api.get("/sponsors");
};

// Children
export const createChild = async (childData) => {
    return await api.post("/children", childData);
};

export const getChildren = async () => {
    return await api.get("/children");
};

export const getChildById = async (childId) => {
    return await api.get(`/children/${childId}`);
};

export const updateChild = async (childId, updatedData) => {
    return await api.put(`/children/${childId}`, updatedData);
};

export const deleteChild = async (childId) => {
    await api.delete(`/children/${childId}`);
    return true;
};

export const addChildReport = async (childId, reportData) => {
    return await api.post(`/children/${childId}/reports`, reportData);
};

// Donations
export const getDonationStats = async () => {
    return await api.get("/donations/stats");
};

export const getDonations = async () => {
    return await api.get("/donations");
};

export const createDonation = async (donationData) => {
    return await api.post("/donations", donationData);
};

// Stories
export const getStories = async () => {
    return await api.get("/stories");
};

export const getStoryById = async (storyId) => {
    return await api.get(`/stories/${storyId}`);
};

export const createStory = async (storyData) => {
    return await api.post("/stories", storyData);
};

// Tasks
export const getTasks = async () => {
    return await api.get("/tasks");
};

export const createTask = async (taskData) => {
    return await api.post("/tasks", taskData);
};

export const assignVolunteerToTask = async (taskId, volunteerId) => {
    return await api.post(`/tasks/${taskId}/assign`, { volunteerId });
};

// Advanced Volunteers
export const getVolunteerById = async (id) => {
    return await api.get(`/volunteers/${id}`);
};

export const updateVolunteer = async (id, data) => {
    return await api.put(`/volunteers/${id}`, data);
};

export const logVolunteerHours = async (id, hours) => {
    return await api.post(`/volunteers/${id}/hours`, { hours });
};
