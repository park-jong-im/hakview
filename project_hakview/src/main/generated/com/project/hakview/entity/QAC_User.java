package com.project.hakview.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QAC_User is a Querydsl query type for AC_User
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QAC_User extends EntityPathBase<AC_User> {

    private static final long serialVersionUID = 578200054L;

    public static final QAC_User aC_User = new QAC_User("aC_User");

    public final StringPath ac_address = createString("ac_address");

    public final StringPath ac_name = createString("ac_name");

    public final StringPath ac_phone = createString("ac_phone");

    public final EnumPath<Authority> authority = createEnum("authority", Authority.class);

    public final StringPath birth = createString("birth");

    public final StringPath id = createString("id");

    public final StringPath nickname = createString("nickname");

    public final StringPath password = createString("password");

    public final StringPath phone = createString("phone");

    public final NumberPath<Long> serial = createNumber("serial", Long.class);

    public QAC_User(String variable) {
        super(AC_User.class, forVariable(variable));
    }

    public QAC_User(Path<? extends AC_User> path) {
        super(path.getType(), path.getMetadata());
    }

    public QAC_User(PathMetadata metadata) {
        super(AC_User.class, metadata);
    }

}

