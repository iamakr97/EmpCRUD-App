package com.user.User.controllers;

import com.user.User.Model.User;
import com.user.User.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class UserController {
    @Autowired
    public UserService userService;

    @PostMapping("/addUser")
    public ResponseEntity<User> createUserHandler(@RequestBody Map<String, Object> userData) {
        User user = new User();
        user.setName((String) userData.get("name"));
        user.setCity((String) userData.get("city"));
        user.setAge((Integer) userData.get("age"));

        User newUser = userService.saveUser(user);

        ResponseEntity<User> res = new ResponseEntity<>(newUser, HttpStatus.CREATED);
        return res;
    }

    @GetMapping("/getUser/{id}")
    public ResponseEntity<User> getUserHandler(@PathVariable("id") int id) {
        User user = userService.getUser(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/getAllUser")
    public ResponseEntity<List<User>> getAllUserHandler() {
        List<User> users = userService.getAllUser();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @PostMapping("/updateUser/{id}")
    public ResponseEntity<User> updateUserHandler(@RequestBody Map<String, Object> data, @PathVariable("id") int id) {
        User user = new User();
        user.setName((String) data.get("name"));
        user.setCity((String) data.get("city"));
        user.setAge((Integer) data.get("age"));

        User updatedUser = userService.updateUser(user, id);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }

    @DeleteMapping("/deleteUser/{id}")
    public ResponseEntity<Void> deleteUserHandler(@PathVariable("id") int id) {
        try {
            userService.deleteUser(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
