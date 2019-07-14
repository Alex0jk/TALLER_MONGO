/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2019-07-13 20:52:07                          */
/*==============================================================*/


drop table if exists MARCA;

drop table if exists MODELO;

drop table if exists PROPIETARIO;

drop table if exists VEHICULO;

/*==============================================================*/
/* Table: MARCA                                                 */
/*==============================================================*/
create table MARCA
(
   CODIGOMARCA          int NOT NULL AUTO_INCREMENT,
   CODIGOMODELO         int,
   NOMBRE               varchar(200) not null,
   primary key (CODIGOMARCA)
);

/*==============================================================*/
/* Table: MODELO                                                */
/*==============================================================*/
create table MODELO
(
   CODIGOMODELO         int NOT NULL AUTO_INCREMENT,
   NOMBRE               varchar(100) not null,
   primary key (CODIGOMODELO)
);

/*==============================================================*/
/* Table: PROPIETARIO                                           */
/*==============================================================*/
create table PROPIETARIO
(
   CODIGOPROPIETARIO    int NOT NULL AUTO_INCREMENT,
   CEDULA               char(10) not null,
   NOMBRE               varchar(200) not null,
   FECHANACIMIENTO      date not null,
   primary key (CODIGOPROPIETARIO)
);

/*==============================================================*/
/* Table: VEHICULO                                              */
/*==============================================================*/
create table VEHICULO
(
   CODIGOVEHICULO       int NOT NULL AUTO_INCREMENT,
   CODIGOMARCA          int,
   CODIGOMODELO         int,
   CODIGOPROPIETARIO    int,
   PLACA                char(7) not null,
   ANIO                 int not null,
   MOTOR                numeric(4,0) not null,
   TRANSMISION          varchar(3) not null,
   primary key (CODIGOVEHICULO)
);

alter table MARCA add constraint FK_REFERENCE_1 foreign key (CODIGOMODELO)
      references MODELO (CODIGOMODELO) on delete restrict on update restrict;

alter table VEHICULO add constraint FK_REFERENCE_2 foreign key (CODIGOMARCA)
      references MARCA (CODIGOMARCA) on delete restrict on update restrict;

alter table VEHICULO add constraint FK_REFERENCE_3 foreign key (CODIGOMODELO)
      references MODELO (CODIGOMODELO) on delete restrict on update restrict;

alter table VEHICULO add constraint FK_REFERENCE_4 foreign key (CODIGOPROPIETARIO)
      references PROPIETARIO (CODIGOPROPIETARIO) on delete restrict on update restrict;

