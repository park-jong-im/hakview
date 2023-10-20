package com.project.hakview.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QRecommend is a Querydsl query type for Recommend
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QRecommend extends EntityPathBase<Recommend> {

    private static final long serialVersionUID = 57618730L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QRecommend recommend = new QRecommend("recommend");

    public final QAC_User ac_user;

    public final QArticle article;

    public final NumberPath<Long> serial = createNumber("serial", Long.class);

    public QRecommend(String variable) {
        this(Recommend.class, forVariable(variable), INITS);
    }

    public QRecommend(Path<? extends Recommend> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QRecommend(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QRecommend(PathMetadata metadata, PathInits inits) {
        this(Recommend.class, metadata, inits);
    }

    public QRecommend(Class<? extends Recommend> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.ac_user = inits.isInitialized("ac_user") ? new QAC_User(forProperty("ac_user")) : null;
        this.article = inits.isInitialized("article") ? new QArticle(forProperty("article"), inits.get("article")) : null;
    }

}

