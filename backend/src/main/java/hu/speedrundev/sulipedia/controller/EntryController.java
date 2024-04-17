package hu.speedrundev.sulipedia.controller;

import hu.speedrundev.sulipedia.dto.attachment.AttachmentList;
import hu.speedrundev.sulipedia.dto.attachment.GetAttachment;
import hu.speedrundev.sulipedia.dto.entry.EntryList;
import hu.speedrundev.sulipedia.dto.entry.GetEntry;
import hu.speedrundev.sulipedia.dto.entry.GetEntryWithID;
import hu.speedrundev.sulipedia.dto.entry.NulledEntry;
import hu.speedrundev.sulipedia.dto.entry.PostEntry;
import hu.speedrundev.sulipedia.dto.entry.SubjectDto;
import hu.speedrundev.sulipedia.dto.entry.UpdateEntry;
import hu.speedrundev.sulipedia.service.EntryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

/**
 * <h3>Entry API Controller</h3>
 *
 * {@code @RestController} class for the Entry API's endpoints,
 */
@Tag(
  name = "Entry API",
  description = "A Sulipédia projekt Bejegyzés, Kérdés, Válasz és Csatolmány táblákhoz kötött RESTful API, CRUD+ műveletekkel"
)
@RestController
public class EntryController {

  /**
   * <h3>SERVICE</h3>
   *
   * Service for the controller of type {@code EntryService}
   * responsible for serving the controller
   */
  @Autowired
  private EntryService service;

  /**
   * <h3>GET(/entry?subject={@code SubjectDto})</h3>
   *
   * List all non-test entries from the DB with an optional subject filter
   *
   * @param subject a {@code SubjectDto} type {@code RequestParam}
   * string value, that's the name of the subject to be filtered with
   *
   * @return a new {@code EntryList} which could be either all non-test
   * entries, or same type of entries filtered by the given subject
   */
  @Operation(
    summary = "List all non-test entries with optional subject filter",
    description = "Az adatbázisban eltárolt összes nem teszt bejegyzés lekérdezése, opcionálisan tantárgy alapján szűrve"
  )
  @GetMapping("/entry")
  public EntryList getEntriesByOptionalSubject(
    @RequestParam(name = "subject", required = false) SubjectDto subject
  ) {
    return service.getEntriesByOptionalSubject(subject);
  }

  /**
   * <h3>GET(/entry/test?subject={@code SubjectDto}</h3>
   *
   * @param subject a {@code SubjectDto} type {@code RequestParam}
   * string value, that's the name of the subject to be filtered with
   *
   * @return a new {@code EntryList} which could be either all test type
   * entries, or same type of entries filtered by the given subject
   */
  @Operation(
    summary = "List all test entries with optional subject filter",
    description = "Az adatbázisban eltárolt összes teszt bejegyzés lekérdezése, opcionálisan tantárgy alapján szűrve"
  )
  @GetMapping("/entry/test")
  public EntryList getTestsByOptionalSubject(
    @RequestParam(name = "subject", required = false) SubjectDto subject
  ) {
    return service.getTestsByOptionalSubject(subject);
  }

  // /**
  //  * <h3>GET(/entry/{id})</h3>
  //  *
  //  * Get all of one entry's data by ID
  //  *
  //  * @param id the ID of the entry requested
  //  *
  //  * @return a new {@code GetEntry} with author, list of attachments, and a
  //  * list of questions, should the entry be a test
  //  */
  // @Operation(
  //   summary = "Get one entry from DB",
  //   description = "Az adatbázisban eltárolt egy bejegyzés lekérdezése ID alapján az útvonalban, szerzővel együtt"
  // )
  // @GetMapping("/entry/{id}")
  // public GetEntry getEntry(@PathVariable Integer id) {
  //   return service.getEntry(id);
  // }

  /**
   * <h3>POST(/entry)</h3>
   *
   * Create a new entry and save it into the DB
   *
   * @param entry a {@code PostEntry} {@code RequestBody}
   * Data Transfer Object, containing information about the new entry
   * @param files an array of {@code MultipartFile}s in {@code RequestParam},
   * that will be treated as attachments for the entry (optional)
   * @param jwt the JSON Web Token of the user requesting the creation of
   * the new entry
   *
   * @return a new {@code GetEntryWithID} containing the newly created
   * entry's data, including any information given to the API, the attachments
   * with download links, the author from the JWT, and the new entry's ID
   * given to it by the DB
   *
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.INTERNAL_SERVER_ERROR} and reason
   * {@code UNEXPECTED_NULL_POINTER_EXCEPTION} if
   *
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.BAD_REQUEST} and reason
   * {@code INPUT_PARAMS_ARE_NULL} if
   *
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.NOT_FOUND} and reason
   * {@code AUTHOR_NOT_FOUND} if
   *
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.BAD_REQUEST} and reason
   * {@code NO_QUESTIONS_SUPPLIED_FOR_TEST_ENTRY} if
   *
   * @throws ResponseStatusException with status code
   * {@code HttpStatus.INTERNAL_SERVER_ERROR} and reason
   * {@code FILE_COULD_NOT_BE_SAVED} if
   */
  @Operation(
    summary = "Create one entry into DB",
    description = "Létrehozni és eltárolni egy bejegyzést az adatbázisban"
  )
  @PostMapping("/entry")
  @ResponseStatus(code = HttpStatus.CREATED)
  public GetEntryWithID createEntry(
    @Valid @RequestBody PostEntry entry,
    @RequestParam(name = "files", required = false) MultipartFile[] files,
    @RequestHeader("Authorization") String jwt
  ) {
    return service.createEntry(entry, files, jwt);
  }

  // /**
  //  * <h3></h3>
  //  *
  //  * @param id
  //  * @param changes
  //  * @return
  //  */
  // @Operation(
  //   summary = "Update one entry's data in DB",
  //   description = "Az adatbázisban eltárolt egy bejegyzés adatainak frissítése"
  // )
  // @PutMapping("/entry/{id}")
  // public GetEntry updateEntry(
  //   @PathVariable Integer id,
  //   @Valid @RequestBody UpdateEntry changes,
  //   @RequestHeader
  // ) {
  //   return service.updateEntry(id, changes);
  // }

  // /**
  //  * <h3></h3>
  //  *
  //  * @return
  //  */
  // @Operation(
  //   summary = "List all entries that will be kept in DB",
  //   description = "Az adatbázisban eltárolt, új tanév kezdése során megtartása kerülő bejegyzések listázása"
  // )
  // @GetMapping("/entry/keep")
  // public EntryList getEntriesKept() {
  //   return service.getEntriesKept();
  // }

  // /**
  //  * <h3></h3>
  //  *
  //  * @return
  //  */
  // @Operation(
  //   summary = "List all entries that will not be kept in DB",
  //   description = "Az adatbázisban eltárolt, új tanév kezdése során megtartásra nem kerülő bejegyzések listázása"
  // )
  // @GetMapping("/entry/not-keep")
  // public EntryList getEntriesNotKept() {
  //   return service.getEntriesNotKept();
  // }

  /**
   * <h3>DELETE(/entry/{id})</h3>
   *
   * Delete an entry logically from the DB based on ID
   *
   * @param id the ID of the entry to be deleted logically
   * @param jwt the JSON Web Token of the user requesting the creation of
   * the new entry
   *
   * @return
   */
  @Operation(
    summary = "Delete one entry from DB logically",
    description = "Az adatbázisban eltárolt bejegyzés logikai törlése"
  )
  @DeleteMapping("/entry/{id}")
  public GetEntryWithID logicalDeleteEntry(
    @PathVariable Integer id,
    @RequestHeader(name = "Authorization") String jwt
  ) {
    return service.logicalDeleteEntry(
      id,
      jwt.substring("Bearer".length()).trim()
    );
  }
  // /**
  //  * <h3></h3>
  //  *
  //  * @param id
  //  * @return
  //  */
  // @Operation(
  //   summary = "Delete one entry from DB with nulling",
  //   description = "Az adatbázisban eltárolt bejegyzés nullázott törlése"
  // )
  // @DeleteMapping("/entry/nulled/{id}")
  // public NulledEntry nullDeleteEntry(@PathVariable Integer id) {
  //   return service.nullDeleteEntry(id);
  // }

  // /**
  //  * <h3>GET(/attachment)</h3>
  //  *
  //  * Request all attachments from the DB
  //  *
  //  * @param entryId the ID of the entry to shrink which attachments we need
  //  * (optional) ({@code @PathVariable} {@code Integer})
  //  *
  //  * @return a new {@code AttachmentList},
  //  * containing a list of {@code AttachmentListItem}s
  //  * with IDs, and all other data of the
  //  */
  // @Operation(
  //   summary = "Get attachments from DB, optionally by entry id",
  //   description = "Az adatbázisban tárolt csatolmányok lekérése listában, akár bejegyzés ID-ja alapján \"szűrve\"."
  // )
  // @GetMapping("/entry/attachment/{entryId}")
  // public AttachmentList listAllAttachmentsByOptionalEntry(
  //   @PathVariable(required = false) Integer entryId
  // ) {
  //   return service.listAllAttachmentsByOptionalEntry(entryId);
  // }

  // /**
  //  * <h3>GET(/attachment/file/{id}</h3>
  //  *
  //  * Download the attachment file content from the DB
  //  *
  //  * @param id the ID of the attachment,
  //  * of which's file content we intend to download
  //  * (required) ({@code @PathVariable} {@code Integer})
  //  *
  //  * @return a ResponseEntity containing a byte array ({@code byte[]}),
  //  * with response status {@code OK},
  //  * Content-Disposition header ({@code HttpHeaders.CONTENT_DISPOSITION}),
  //  * describing the incoming data as an attachment,
  //  * including original {@code Attachment} filename,
  //  * and finally the {@code Attachment} file byte data itself
  //  *
  //  * @throws ResponseStatusException
  //  * with status code {@code HttpStatus.INTERNAL_SERVER_ERROR}
  //  * and reason {@code UNEXPECTED_NULL_POINTER_EXCEPTION}
  //  * if the service for some reason
  //  * recieves a {@code null} as the ID parameter
  //  */
  // @Operation(
  //   summary = "Get the file data of an attachment from DB",
  //   description = "Az adatbázisban tárolt csatolmány fájl letöltésére szolgáló végpont."
  // )
  // @GetMapping("/entry/attachment/file/{id}")
  // public ResponseEntity<byte[]> getAttachmentFile(@PathVariable Integer id) {
  //   return service.getAttachmentFile(id);
  // }

  // /**
  //  * <h3>DELETE(/attachment/{id})</h3>
  //  *
  //  * Delete an attachment from the DB based on ID
  //  *
  //  * @param id the ID of the attachment to be deleted
  //  *
  //  * @return a true value if the delete operation was successful
  //  *
  //  * @throws ResponseStatusException
  //  * with status code {@code HttpStatus.INTERNAL_SERVER_ERROR}
  //  * and reason {@code UNEXPECTED_NULL_POINTER_EXCEPTION}
  //  * if the service for some reason
  //  * recieves a {@code null} as the {@code MutlipartFile} parameter
  //  *
  //  * @throws ResponseStatusException
  //  * with status code {@code HttpStatus.INTERNAL_SERVER_ERROR}
  //  * and reason {@code FILE_COULD_NOT_BE_SAVED}
  //  * if the saving opertaion failed,
  //  * when getting the {@code byte[]} data of the file
  //  */
  // @Operation(
  //   summary = "Delete an attachment from DB",
  //   description = "Az adatbázisban tárolt csatolmány törlése belőle; ez a törlés nem fordítható vissza!"
  // )
  // @DeleteMapping("/entry/attachment/{id}")
  // public boolean deleteAttachment(@PathVariable Integer id) {
  //   return service.deleteAttachment(id);
  // }

  // /**
  //  * <h3>PUT(/attachment/{id})</h3>
  //  *
  //  * Overwrite an existing attachment, with a completely new one
  //  *
  //  * @param id the ID of the existing attachment to be overwritten
  //  *
  //  * @param file the {@code MultipartFile} new attachment,
  //  * which is going in place of the old data
  //  *
  //  * @return a new {@code GetAttachment},
  //  * as confirmation of successful overwrite,
  //  * containing the link with the identifier of the saved file,
  //  * from where it can be accessed for download, as well as other data,
  //  * like the file name and the file type
  //  *
  //  * @throws ResponseStatusException
  //  * with status code {@code HttpStatus.INTERNAL_SERVER_ERROR}
  //  * and reason {@code UNEXPECTED_NULL_POINTER_EXCEPTION}
  //  * if the service for some reason
  //  * recieves a {@code null} as either of the input parameters
  //  *
  //  * @throws ResponseStatusException
  //  * with status code {@code HttpStatus.NOT_FOUND}
  //  * and reason {@code ATTACHMENT_NOT_FOUND}
  //  * if the requested {@code Attachment} to be overwritten can't be found
  //  *
  //  * @throws ResponseStatusException
  //  * with status code {@code HttpStatus.BAD_REQUEST}
  //  * and reason {@code NEW_ATTACHMENT_IDENTICAL_TO_OLD}
  //  * if the new {@code MultipartFile} data matches the existing data
  //  */
  // @Operation(
  //   summary = "Overwrite the attachment with something else",
  //   description = "Az adatbázisban tárolt csatolmány fájl tartalmának felülírása."
  // )
  // @PutMapping("/entry/attachment/{id}")
  // public GetAttachment changeAttachment(
  //   @PathVariable Integer id,
  //   @RequestParam("file") MultipartFile file
  // ) {
  //   return service.updateAttachment(id, file);
  // }
}
