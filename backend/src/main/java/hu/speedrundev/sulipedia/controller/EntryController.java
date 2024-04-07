package hu.speedrundev.sulipedia.controller;

import hu.speedrundev.sulipedia.dto.attachment.AttachmentList;
import hu.speedrundev.sulipedia.dto.attachment.GetAttachment;
import hu.speedrundev.sulipedia.dto.entry.EntryList;
import hu.speedrundev.sulipedia.dto.entry.GetEntry;
import hu.speedrundev.sulipedia.dto.entry.GetEntryWithID;
import hu.speedrundev.sulipedia.dto.entry.NulledEntry;
import hu.speedrundev.sulipedia.dto.entry.PostEntry;
import hu.speedrundev.sulipedia.dto.entry.UpdateEntry;
import hu.speedrundev.sulipedia.service.EntryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
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

  @Autowired
  private EntryService service;

  @Operation(
    summary = "List all entries with optional category filter",
    description = "Az adatbázisban eltárolt összes bejegyzés lekérdezése, opcionálisan kategória alapján szűrve"
  )
  @GetMapping("/entry")
  public EntryList getEntriesByOptionalCategory(
    @RequestParam(name = "category", required = false) String category
  ) {
    return service.getEntriesByOptionalCategory(category);
  }

  @Operation(
    summary = "Get one entry from DB",
    description = "Az adatbázisban eltárolt egy bejegyzés lekérdezése ID alapján az útvonalban, szerzővel együtt"
  )
  @GetMapping("/entry/{id}")
  public GetEntry getEntry(@PathVariable Integer id) {
    return service.getEntry(id);
  }

  @Operation(
    summary = "Create one entry into DB",
    description = "Létrehozni és eltárolni egy bejegyzést az adatbázisban"
  )
  @PostMapping("/entry")
  public GetEntryWithID createEntry(
    @Valid @RequestBody PostEntry entry,
    @RequestParam("files") MultipartFile[] files,
    @RequestHeader("Authorization") String jwt
  ) {
    return service.createEntry(entry, files, jwt);
  }

  @Operation(
    summary = "Update one entry's data in DB",
    description = "Az adatbázisban eltárolt egy bejegyzés adatainak frissítése"
  )
  @PutMapping("/entry/{id}")
  public GetEntry updateEntry(
    @PathVariable Integer id,
    @Valid @RequestBody UpdateEntry changes
  ) {
    return service.updateEntry(id, changes);
  }

  @Operation(
    summary = "List all entries that will be kept in DB",
    description = "Az adatbázisban eltárolt, új tanév kezdése során megtartása kerülő bejegyzések listázása"
  )
  @GetMapping("/entry/keep")
  public EntryList getEntriesKept() {
    return service.getEntriesThatAreKept();
  }

  @Operation(
    summary = "List all entries that will not be kept in DB",
    description = "Az adatbázisban eltárolt, új tanév kezdése során megtartásra nem kerülő bejegyzések listázása"
  )
  @GetMapping("/entry/not-keep")
  public EntryList getEntriesNotKept() {
    return service.getEntriesNotKept();
  }

  @Operation(
    summary = "Delete one entry from DB logically",
    description = "Az adatbázisban eltárolt bejegyzés logikai törlése"
  )
  @DeleteMapping("/entry/{id}")
  public GetEntry softDeleteEntry(@PathVariable Integer id) {
    return service.logicalDeleteEntry(id);
  }

  @Operation(
    summary = "Delete one entry from DB with nulling",
    description = "Az adatbázisban eltárolt bejegyzés nullázott törlése"
  )
  @DeleteMapping("/entry/nulled/{id}")
  public NulledEntry nullDeleteEntry(@PathVariable Integer id) {
    return service.nullDeleteEntry(id);
  }

  /**
   * <h3>GET(/attachment)</h3>
   *
   * Request all attachments from the DB
   *
   * @param entryId the ID of the entry to shrink which attachments we need<br></br>
   * (optional) ({@code @PathVariable} {@code Integer})
   *
   * @return a new {@code AttachmentList},
   * containing a list of {@code AttachmentListItem}s
   * with IDs, and all other data of the
   */
  @Operation(
    summary = "Get attachments from DB, optionally by entry id",
    description = "Az adatbázisban tárolt csatolmányok lekérése listában, akár bejegyzés ID-ja alapján \"szűrve\"."
  )
  @GetMapping("/entry/attachment/{entryId}")
  public AttachmentList listAllAttachmentsByOptionalEntry(
    @PathVariable(required = false) Integer entryId
  ) {
    return service.listAllAttachmentsByOptionalEntry(entryId);
  }

  /**
   * <h3>GET(/attachment/file/{id}</h3>
   *
   * Download the attachment file content from the DB
   *
   * @param id the ID of the attachment,<br></br>
   * of which's file content we intend to download
   * (required) ({@code @PathVariable} {@code Integer})
   *
   * @return a ResponseEntity containing a byte array ({@code byte[]}),<br></br>
   * with response status {@code OK},<br></br>
   * Content-Disposition header ({@code HttpHeaders.CONTENT_DISPOSITION}),
   * describing the incoming data as an attachment,<br></br>
   * including original {@code Attachment} filename,<br></br>
   * and finally the {@code Attachment} file byte data itself
   *
   * @throws ResponseStatusException <br></br>
   * with status code {@code HttpStatus.INTERNAL_SERVER_ERROR}<br></br>
   * and reason {@code UNEXPECTED_NULL_POINTER_EXCEPTION}<br></br>
   * if the service for some reason<br></br>
   * recieves a {@code null} as the ID parameter
   */
  @Operation(
    summary = "Get the file data of an attachment from DB",
    description = "Az adatbázisban tárolt csatolmány fájl letöltésére szolgáló végpont."
  )
  @GetMapping("/entry/attachment/file/{id}")
  public ResponseEntity<byte[]> getAttachmentFile(@PathVariable Integer id) {
    return service.getAttachmentFile(id);
  }

  /**
   * <h3>DELETE(/attachment/{id})</h3>
   *
   * Delete an attachment from the DB based on ID
   *
   * @param id the ID of the attachment to be deleted
   *
   * @return a true value if the delete operation was successful
   *
   * @throws ResponseStatusException <br></br>
   * with status code {@code HttpStatus.INTERNAL_SERVER_ERROR}<br></br>
   * and reason {@code UNEXPECTED_NULL_POINTER_EXCEPTION}<br></br>
   * if the service for some reason<br></br>
   * recieves a {@code null} as the {@code MutlipartFile} parameter
   *
   * @throws ResponseStatusException <br></br>
   * with status code {@code HttpStatus.INTERNAL_SERVER_ERROR}<br></br>
   * and reason {@code FILE_COULD_NOT_BE_SAVED}<br></br>
   * if the saving opertaion failed,<br></br>
   * when getting the {@code byte[]} data of the file
   */
  @Operation(
    summary = "Delete an attachment from DB",
    description = "Az adatbázisban tárolt csatolmány törlése belőle; ez a törlés nem fordítható vissza!"
  )
  @DeleteMapping("/entry/attachment/{id}")
  public boolean deleteAttachment(@PathVariable Integer id) {
    return service.deleteAttachment(id);
  }

  /**
   * <h3>PUT(/attachment/{id})</h3>
   *
   * Overwrite an existing attachment, with a completely new one
   *
   * @param id the ID of the existing attachment to be overwritten
   *
   * @param file the {@code MultipartFile} new attachment,<br></br>
   * which is going in place of the old data
   *
   * @return a new {@code GetAttachment},<br></br>
   * as confirmation of successful overwrite,<br></br>
   * containing the link with the identifier of the saved file,<br></br>
   * from where it can be accessed for download, as well as other data,<br></br>
   * like the file name and the file type
   *
   * @throws ResponseStatusException <br></br>
   * with status code {@code HttpStatus.INTERNAL_SERVER_ERROR}<br></br>
   * and reason {@code UNEXPECTED_NULL_POINTER_EXCEPTION}<br></br>
   * if the service for some reason<br></br>
   * recieves a {@code null} as either of the input parameters
   *
   * @throws ResponseStatusException <br></br>
   * with status code {@code HttpStatus.NOT_FOUND}<br></br>
   * and reason {@code ATTACHMENT_NOT_FOUND}<br></br>
   * if the requested {@code Attachment} to be overwritten can't be found
   *
   * @throws ResponseStatusException <br></br>
   * with status code {@code HttpStatus.BAD_REQUEST}<br></br>
   * and reason {@code NEW_ATTACHMENT_IDENTICAL_TO_OLD}<br></br>
   * if the new {@code MultipartFile} data matches the existing data
   */
  @Operation(
    summary = "Overwrite the attachment with something else",
    description = "Az adatbázisban tárolt csatolmány fájl tartalmának felülírása."
  )
  @PutMapping("/entry/attachment/{id}")
  public GetAttachment changeAttachment(
    @PathVariable Integer id,
    @RequestParam("file") MultipartFile file
  ) {
    return service.updateAttachment(id, file);
  }
}
