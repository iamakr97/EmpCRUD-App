package com.user.User.services;

import com.user.User.Model.User;

import java.util.List;

public interface UserService {
    User saveUser(User user);
    User updateUser(User user, int id);
    void deleteUser(int id);
    List<User> getAllUser();
    User getUser(int id);
}
