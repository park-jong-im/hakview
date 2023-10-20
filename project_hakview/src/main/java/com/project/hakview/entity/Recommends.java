package com.project.hakview.entity;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Recommends {
	
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "RECOMMENDS_SEQ")
    @SequenceGenerator(name = "RECOMMENDS_SEQ", sequenceName = "HAKVIEW_SEQ", allocationSize = 1)
    private Long serial;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private AC_User ac_user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "freeboard_id")
    private Freeboard freeboard;

    public Recommends(AC_User ac_user, Freeboard freeboard) {
        this.ac_user = ac_user;
        this.freeboard = freeboard;
    }
}
