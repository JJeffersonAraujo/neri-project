export class UserRepository {
    static users = [];
    async create(user) {
        UserRepository.users.push(user);
        return user;
    }
    async findByEmail(email) {
        return UserRepository.users.find(user => user.email === email);
    }
    async findById(id) {
        return UserRepository.users.find(user => user.id === id);
    }
}
