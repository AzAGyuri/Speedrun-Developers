package hu.speedrundev.sulipedia.dto.comment;

import java.util.List;

import hu.speedrundev.sulipedia.model.Comment;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CommentList {
    private List<CommentListItem> comments;

    public CommentList(List<Comment> comments) {
        this.comments = comments.stream().map(comment -> new CommentListItem(comment)).toList();
    }
}
