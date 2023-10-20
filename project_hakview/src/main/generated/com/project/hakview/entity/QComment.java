package com.project.hakview.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QComment is a Querydsl query type for Comment
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QComment extends EntityPathBase<MainComment> {

    private static final long serialVersionUID = -668446131L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QComment comment = new QComment("comment");

    public final QAC_User ac_user;

    public final DateTimePath<java.time.LocalDateTime> createdAt = createDateTime("createdAt", java.time.LocalDateTime.class);

    public final QFreeboard freeboard;

    public final NumberPath<Long> serial = createNumber("serial", Long.class);

    public final StringPath text = createString("text");

    public QComment(String variable) {
        this(MainComment.class, forVariable(variable), INITS);
    }

    public QComment(Path<? extends MainComment> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QComment(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QComment(PathMetadata metadata, PathInits inits) {
        this(MainComment.class, metadata, inits);
    }

    public QComment(Class<? extends MainComment> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.ac_user = inits.isInitialized("ac_user") ? new QAC_User(forProperty("ac_user")) : null;
        this.freeboard = inits.isInitialized("freeboard") ? new QFreeboard(forProperty("freeboard"), inits.get("freeboard")) : null;
    }

}

