import User from "../models/user.js";

async function getUsers(request, response) {
    const users = await User.find();
    return response.status(200).json(users);
}

async function createUsers(request, response) {
    const user = request.body;
    const newUser = await User.create(user);
    return response.json(newUser);
}

export { createUsers, getUsers };
