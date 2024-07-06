package com.user.User.services.impl;

import com.user.User.Model.User;
import com.user.User.repository.UserRepository;
import com.user.User.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User updateUser(User user, int id) {
        Optional<User> userOptional = userRepository.findById(id);
        User user1 = userOptional.orElseThrow(()->new RuntimeException("User Not Found"));
        user1.setName(user.getName());
        user1.setAge(user.getAge());
        user1.setCity(user.getCity());

        return userRepository.save(user1);
    }

    @Override
    public void deleteUser(int id) {
        Optional<User> userOptional = userRepository.findById(id);
        User user = userOptional.orElseThrow(()->new RuntimeException("User Not Found"));
        userRepository.delete(user);
    }

    @Override
    public List<User> getAllUser() {
        List<User> users = userRepository.findAll();
        return users;
    }

    @Override
    public User getUser(int id) {
        Optional<User> userOptional = userRepository.findById(id);
        User user = userOptional.orElseThrow(()->new RuntimeException("User Not Found"));
        return user;
    }
}
