package hu.speedrundev.sulipedia.service;

import static hu.speedrundev.sulipedia.util.ExceptionUtils.*;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import hu.speedrundev.sulipedia.dto.group.GetGroupWithID;
import hu.speedrundev.sulipedia.dto.group.GetGroupWithUsers;
import hu.speedrundev.sulipedia.dto.group.GroupList;
import hu.speedrundev.sulipedia.dto.group.PostGroup;
import hu.speedrundev.sulipedia.model.Group;
import hu.speedrundev.sulipedia.model.User;
import hu.speedrundev.sulipedia.repository.GroupRepository;
import hu.speedrundev.sulipedia.repository.UserRepository;
import hu.speedrundev.sulipedia.util.JwtUtil;

@Service
public class GroupService {

    @Autowired
    private GroupRepository repository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    public GroupList listGroupsByOptionalUserId(Integer userId) {
        if (userId == null) return new GroupList(repository.findAll());
        return new GroupList(repository.findAllByUserId(userId));
    }

    public GetGroupWithUsers getGroup(Integer id) {
        if (id == null) throw nullPointer();
        if (!repository.existsById(id)) throw modelNotFound("GROUP_NOT_FOUND");

        return new GetGroupWithUsers(repository.getReferenceById(id));
    }

    public GetGroupWithID createGroup(PostGroup group, String token) {
        if (group == null) throw nullPointer();

        String username = jwtUtil.getSubject(token);

        Optional<User> creator = userRepository.findByUsername(username);

        if (creator.isEmpty()) throw modelNotFound("USER_NOT_FOUND");

        return new GetGroupWithID(repository.save(new Group(group, creator.get())));
    }

}
