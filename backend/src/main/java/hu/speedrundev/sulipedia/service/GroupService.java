package hu.speedrundev.sulipedia.service;

import static hu.speedrundev.sulipedia.util.ExceptionUtils.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import hu.speedrundev.sulipedia.dto.group.GetGroupWithID;
import hu.speedrundev.sulipedia.dto.group.GetGroupWithUsers;
import hu.speedrundev.sulipedia.dto.group.GroupList;
import hu.speedrundev.sulipedia.dto.group.PostGroup;
import hu.speedrundev.sulipedia.model.Group;
import hu.speedrundev.sulipedia.repository.GroupRepository;

@Service
public class GroupService {

    @Autowired
    private GroupRepository repository;

    public GroupList listGroupsByOptionalUserId(Integer userId) {
        if (userId == null) return new GroupList(repository.findAll());
        return new GroupList(repository.findAllByUserId(userId));
    }

    public GetGroupWithUsers getGroup(Integer id) {
        if (id == null) throw nullPointer();
        if (!repository.existsById(id)) throw modelNotFound("GROUP_NOT_FOUND");

        return new GetGroupWithUsers(repository.getReferenceById(id));
    }

    public GetGroupWithID createGroup(PostGroup group) {
        if (group == null) throw nullPointer();

        return new GetGroupWithID(repository.save(new Group(group)));
    }

}
