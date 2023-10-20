package com.project.hakview.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QRComment is a Querydsl query type for RComment
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QRComment extends EntityPathBase<RComment> {

    private static final long serialVersionUID = 787389279L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QRComment rComment = new QRComment("rComment");

    public final QAC_User ac_user;

    public final DateTimePath<java.time.LocalDateTime> createdAt = createDateTime("createdAt", java.time.LocalDateTime.class);

    public final QReview review;

    public final NumberPath<Long> serial = createNumber("serial", Long.class);

    public final StringPath text = createString("text");

    public QRComment(String variable) {
        this(RComment.class, forVariable(variable), INITS);
    }

    public QRComment(Path<? extends RComment> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QRComment(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QRComment(PathMetadata metadata, PathInits inits) {
        this(RComment.class, metadata, inits);
    }

    public QRComment(Class<? extends RComment> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.ac_user = inits.isInitialized("ac_user") ? new QAC_User(forProperty("ac_user")) : null;
        this.review = inits.isInitialized("review") ? new QReview(forProperty("review"), inits.get("review")) : null;
    }

}

