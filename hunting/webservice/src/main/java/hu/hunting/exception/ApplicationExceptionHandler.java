package hu.hunting.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class ApplicationExceptionHandler {

    @ResponseStatus(value = HttpStatus.I_AM_A_TEAPOT, reason = "QUARRY_NOT_FOUND")
    @ExceptionHandler(QuarryNotFoundException.class)
    public void quarryNotFoundExceptionHandler(QuarryNotFoundException ex){
    }
    @ResponseStatus(value = HttpStatus.I_AM_A_TEAPOT, reason = "HUNTER_NOT_FOUND")
    @ExceptionHandler(HunterNotFoundException.class)
    public void hunterNotFoundExceptionHandler(HunterNotFoundException ex){
    }
    @ResponseStatus(value = HttpStatus.NOT_ACCEPTABLE, reason = "HUNTER_HAS_ALREADY_SHOT")
    @ExceptionHandler(HunterRemoveNotPossibleException.class)
    public void hunterRemoveNotPossibleHandler(HunterRemoveNotPossibleException ex){
    }
    @ResponseStatus(value = HttpStatus.I_AM_A_TEAPOT, reason = "HUNT_NOT_FOUND")
    @ExceptionHandler(HuntNotFoundException.class)
    public void huntNotFoundExceptionHandler(HuntNotFoundException ex){
    }
    @ResponseStatus(value = HttpStatus.NOT_ACCEPTABLE, reason = "HUNTER_HAS_ALREADY_SIGNED_UP_FOR_THIS_HUNT")
    @ExceptionHandler(HunterAlreadySignedUpForHunt.class)
    public void hunterAlreadySignedUpForHunt(HunterAlreadySignedUpForHunt ex){
    }

    @ResponseStatus(value = HttpStatus.NOT_ACCEPTABLE, reason = "HUNTER_FIRSTNAME_MUST_NOT_BE_EMPTY")
    @ExceptionHandler(FirstNameExpectedException.class)
    public void firstNameExpectedException(FirstNameExpectedException ex){
    }
    @ResponseStatus(value = HttpStatus.NOT_ACCEPTABLE, reason = "END_DATE_IS_BEFORE_START_DATE")
    @ExceptionHandler(TimeTravellingNotAcceptable.class)
    public void timeTravellingNotAcceptable(TimeTravellingNotAcceptable ex){
    }
}
