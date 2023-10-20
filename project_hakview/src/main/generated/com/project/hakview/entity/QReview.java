package com.project.hakview.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QReview is a Querydsl query type for Review
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QReview extends EntityPathBase<Review> {

    private static final long serialVersionUID = 1645829546L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QReview review = new QReview("review");

    public final QAC_User ac_user;

    public final QAC_User author;

    public final StringPath body = createString("body");

    public final ListPath<RComment, QRComment> comments = this.<RComment, QRComment>createList("comments", RComment.class, QRComment.class, PathInits.DIRECT2);

    public final DateTimePath<java.time.LocalDateTime> createdAt = createDateTime("createdAt", java.time.LocalDateTime.class);

    public final ListPath<RRecommend, QRRecommend> recommends = this.<RRecommend, QRRecommend>createList("recommends", RRecommend.class, QRRecommend.class, PathInits.DIRECT2);

    public final NumberPath<Long> serial = createNumber("serial", Long.class);

    public final NumberPath<Double> starpoint1 = createNumber("starpoint1", Double.class);

    public final NumberPath<Double> starpoint2 = createNumber("starpoint2", Double.class);

    public final NumberPath<Double> starpoint3 = createNumber("starpoint3", Double.class);

    public final NumberPath<Double> starpoint4 = createNumber("starpoint4", Double.class);

    public final NumberPath<Double> starpoint5 = createNumber("starpoint5", Double.class);

    public final NumberPath<Double> avgstarpoint = createNumber("avgstarpoint", Double.class);

    public final StringPath title = createString("title");

    public final DateTimePath<java.time.LocalDateTime> updatedAt = createDateTime("updatedAt", java.time.LocalDateTime.class);

    public QReview(String variable) {
        this(Review.class, forVariable(variable), INITS);
    }

    public QReview(Path<? extends Review> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QReview(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QReview(PathMetadata metadata, PathInits inits) {
        this(Review.class, metadata, inits);
    }

    public QReview(Class<? extends Review> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.ac_user = inits.isInitialized("ac_user") ? new QAC_User(forProperty("ac_user")) : null;
        this.author = inits.isInitialized("author") ? new QAC_User(forProperty("author")) : null;
    }

}

