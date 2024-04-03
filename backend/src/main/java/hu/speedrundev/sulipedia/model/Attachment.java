package hu.speedrundev.sulipedia.model;

import static hu.speedrundev.sulipedia.util.ExceptionUtils.fileIO;
import static hu.speedrundev.sulipedia.util.ExceptionUtils.nullPointer;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import java.io.IOException;
import java.util.Arrays;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Attachment {

  public Attachment(MultipartFile file, Entry linkedEntry) throws IOException {
    String fileName = file.getOriginalFilename();

    if (fileName == null) throw nullPointer();

    this.filename = StringUtils.cleanPath(fileName);
    this.filetype = file.getContentType();
    this.fileData = file.getBytes();
    this.linkedEntry = linkedEntry;
  }

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(name = "file_name", nullable = false)
  private String filename;

  private String filetype;

  @Lob
  private byte[] fileData;

  @ManyToOne
  @JoinColumn(name = "entry_id")
  private Entry linkedEntry;

  @SuppressWarnings("null")
  public boolean isNotChanged(MultipartFile file) {
    boolean notChanged = false;
    try {
      notChanged =
        Arrays.equals(this.fileData, file.getBytes()) &&
        this.filename == StringUtils.cleanPath(file.getOriginalFilename()) &&
        this.filetype == file.getContentType();
    } catch (IOException e) {
      e.printStackTrace();
      throw fileIO();
    }

    return notChanged;
  }

  public Attachment update(MultipartFile file) {
    if (file == null) throw nullPointer();

    String filename;
    if ((filename = file.getOriginalFilename()) == null) throw nullPointer();

    try {
      this.fileData = file.getBytes();
      this.filename = StringUtils.cleanPath(filename);
      this.filetype = file.getContentType();
    } catch (IOException e) {
      e.printStackTrace();
      throw fileIO();
    }

    return this;
  }
}
