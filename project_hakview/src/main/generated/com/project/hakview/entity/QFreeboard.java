package com.project.hakview.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QFreeboard is a Querydsl query type for Freeboard
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QFreeboard extends EntityPathBase<Freeboard> {

    private static final long serialVersionUID = -1362420632L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QFreeboard freeboard = new QFreeboard("freeboard");

    public final QAC_User ac_user;

    public final QAC_User author;

    public final StringPath body = createString("body");

    public final ListPath<MainComment, QComment> comments = this.<MainComment, QComment>createList("comments", MainComment.class, QComment.class, PathInits.DIRECT2);

    public final DateTimePath<java.time.LocalDateTime> createdAt = createDateTime("createdAt", java.time.LocalDateTime.class);

    public final ListPath<Recommends, QRecommends> recommends = this.<Recommends, QRecommends>createList("recommends", Recommends.class, QRecommends.class, PathInits.DIRECT2);

    public final NumberPath<Long> serial = createNumber("serial", Long.class);

    public final StringPath title = createString("title");

    public final DateTimePath<java.time.LocalDateTime> updatedAt = createDateTime("updatedAt", java.time.LocalDateTime.class);

    public QFreeboard(String variable) {
        this(Freeboard.class, forVariable(variable), INITS);
    }

    public QFreeboard(Path<? extends Freeboard> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QFreeboard(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QFreeboard(PathMetadata metadata, PathInits inits) {
        this(Freeboard.class, metadata, inits);
    }

    public QFreeboard(Class<? extends Freeboard> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.ac_user = inits.isInitialized("ac_user") ? new QAC_User(forProperty("ac_user")) : null;
        this.author = inits.isInitialized("author") ? new QAC_User(forProperty("author")) : null;
    }

}

