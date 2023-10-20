package com.project.hakview.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QRRecommend is a Querydsl query type for RRecommend
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QRRecommend extends EntityPathBase<RRecommend> {

    private static final long serialVersionUID = -1043890756L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QRRecommend rRecommend = new QRRecommend("rRecommend");

    public final QAC_User ac_user;

    public final QReview review;

    public final NumberPath<Long> serial = createNumber("serial", Long.class);

    public QRRecommend(String variable) {
        this(RRecommend.class, forVariable(variable), INITS);
    }

    public QRRecommend(Path<? extends RRecommend> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QRRecommend(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QRRecommend(PathMetadata metadata, PathInits inits) {
        this(RRecommend.class, metadata, inits);
    }

    public QRRecommend(Class<? extends RRecommend> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.ac_user = inits.isInitialized("ac_user") ? new QAC_User(forProperty("ac_user")) : null;
        this.review = inits.isInitialized("review") ? new QReview(forProperty("review"), inits.get("review")) : null;
    }

}

