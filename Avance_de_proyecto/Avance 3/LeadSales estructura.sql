create database LeadSales;
Use LeadSales;
DROP table usuario_tiene_rol;
DROP TABLE Rol_adquiere_Funcion;
Drop table version_almacena_leads;
Drop TABLE Version;
Drop table Leads;
DROP TABLE Usuario;
DROP TABLE ROL;
DROP TABLE Funcion;

CREATE TABLE Usuario (
  IDUsuario int AUTO_INCREMENT NOT NULL,
  UserName varchar(30) COLLATE utf8_spanish2_ci NOT NULL,
  Nombre varchar(30) COLLATE utf8_spanish2_ci NOT NULL,
  Password varchar(30) COLLATE utf8_spanish2_ci NOT NULL,
  PRIMARY KEY (IDUsuario)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

CREATE TABLE Rol(
  IDRol int AUTO_INCREMENT NOT NULL,
  TipoRol varchar(30) COLLATE utf8_spanish2_ci NOT NULL,
  primary key (IDRol)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

CREATE TABLE Usuario_tiene_Rol(
     IDUsuario int,
	 IDRol int,
	 FechaUsuarioRol Datetime,
     FOREIGN KEY (IDUsuario) references Usuario(IDUsuario),
     FOREIGN KEY (IDRol) references Rol(IDRol),
     PRIMARY KEY (IDUsuario,IDRol,FechaUsuarioRol)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

CREATE TABLE Funcion(
  IDFuncion int AUTO_INCREMENT NOT NULL,
  Descripcion varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  primary key (IDFuncion)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

CREATE TABLE Rol_adquiere_Funcion(
     IDRol int,
	 IDFuncion int,
	 FechaRolFuncion Datetime,
	 FOREIGN KEY (IDRol) references Rol(IDRol),
     FOREIGN KEY (IDFuncion) references Funcion(IDFuncion),
     PRIMARY KEY (IDFuncion,IDRol, FechaRolFuncion)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

CREATE TABLE Leads(
  IDLead int AUTO_INCREMENT NOT NULL,
  IDUsuario int,
  Telefono varchar(12),
  NombreLead varchar(30),
  FechaPrimerMensaje timestamp,
  Embudo varchar(30),
  Status varchar (30),
  Archivado Boolean,
  CreadoManual Boolean,
  FOREIGN KEY (IDUsuario) references Usuario(IDUsuario),
  Primary key(IDLead)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

Create table Version(
  IDVersion int AUTO_INCREMENT NOT NULL,
  IDUsuario int, 
  FechaCreacion timestamp,
  FOREIGN KEY (IDUsuario) references Usuario(IDUsuario),
  Primary key(IDVersion)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

Create table Version_almacena_leads(
	 IDVersion int,
	 IDLead int,
	 FechaVersionAlmacenaLead Datetime,
     FOREIGN KEY (IDVersion) references Version(IDVersion),
	 FOREIGN KEY (IDLead) references Leads(IDLead),
     PRIMARY KEY (IDVersion,IDLead,FechaVersionAlmacenaLead)
);

LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.2/Uploads/Usuario.csv' 
INTO TABLE Usuario
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"' 
LINES TERMINATED BY '\n' 
IGNORE 1 ROWS;

LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.2/Uploads/Rol.csv' 
INTO TABLE Rol
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"' 
LINES TERMINATED BY '\n' 
IGNORE 1 ROWS;

LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.2/Uploads/Usuario_tiene_Rol.csv' 
INTO TABLE Usuario_tiene_Rol
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"' 
LINES TERMINATED BY '\n' 
IGNORE 1 ROWS;

LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.2/Uploads/Funcion.csv' 
INTO TABLE Funcion
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"' 
LINES TERMINATED BY '\n' 
IGNORE 1 ROWS;

LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.2/Uploads/Rol_Adquiere_Funcion.csv' 
INTO TABLE Rol_adquiere_Funcion
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"' 
LINES TERMINATED BY '\n' 
IGNORE 1 ROWS;


LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.2/Uploads/Leads.csv' 
INTO TABLE Leads
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"' 
LINES TERMINATED BY '\n' 
IGNORE 1 ROWS;

LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.2/Uploads/Version.csv' 
INTO TABLE Version
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"' 
LINES TERMINATED BY '\n' 
IGNORE 1 ROWS;

LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.2/Uploads/Version_Almacena_Lead.csv' 
INTO TABLE Version_almacena_leads
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"' 
LINES TERMINATED BY '\n' 
IGNORE 1 ROWS;

Select L.telefono, U.Nombre as "Nombre seller"
from Leads as L, Usuario as U
Where L.IDUsuario=U.IDUsuario