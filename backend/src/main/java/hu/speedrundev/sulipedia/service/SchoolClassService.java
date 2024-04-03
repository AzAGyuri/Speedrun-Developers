package hu.speedrundev.sulipedia.service;

import static hu.speedrundev.sulipedia.util.ExceptionUtils.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import hu.speedrundev.sulipedia.dto.schoolclass.GetSchoolClassWithEverything;
import hu.speedrundev.sulipedia.dto.schoolclass.GetSchoolClassWithID;
import hu.speedrundev.sulipedia.dto.schoolclass.PostSchoolClass;
import hu.speedrundev.sulipedia.dto.schoolclass.SchoolClassList;
import hu.speedrundev.sulipedia.model.SchoolClass;
import hu.speedrundev.sulipedia.repository.SchoolClassRepository;

@Service
public class SchoolClassService {

    @Autowired
    private SchoolClassRepository repository;

    public SchoolClassList listSchoolClasses(Integer userId) {
        if (userId == null) return new SchoolClassList(repository.findAll());
        return new SchoolClassList(repository.findAllByUserId(userId));
    }

    public GetSchoolClassWithEverything getSchoolClass(Integer id) {
        if (id == null) throw nullPointer();
        if (!repository.existsById(id)) throw modelNotFound("SCHOOL_CLASS_NOT_FOUND");

        return new GetSchoolClassWithEverything(repository.getReferenceById(id));
    }

    public GetSchoolClassWithID createSchoolClass(PostSchoolClass schoolClass) {
        if (schoolClass == null) throw nullPointer();

        return new GetSchoolClassWithID(repository.save(new SchoolClass(schoolClass)));
    }

}
