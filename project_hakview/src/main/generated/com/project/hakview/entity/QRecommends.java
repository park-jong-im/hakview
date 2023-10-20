package com.project.hakview.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QRecommends is a Querydsl query type for Recommends
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QRecommends extends EntityPathBase<Recommends> {

    private static final long serialVersionUID = 1786180745L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QRecommends recommends = new QRecommends("recommends");

    public final QAC_User ac_user;

    public final QFreeboard freeboard;

    public final NumberPath<Long> serial = createNumber("serial", Long.class);

    public QRecommends(String variable) {
        this(Recommends.class, forVariable(variable), INITS);
    }

    public QRecommends(Path<? extends Recommends> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QRecommends(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QRecommends(PathMetadata metadata, PathInits inits) {
        this(Recommends.class, metadata, inits);
    }

    public QRecommends(Class<? extends Recommends> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.ac_user = inits.isInitialized("ac_user") ? new QAC_User(forProperty("ac_user")) : null;
        this.freeboard = inits.isInitialized("freeboard") ? new QFreeboard(forProperty("freeboard"), inits.get("freeboard")) : null;
    }

}

