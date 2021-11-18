INSERT INTO departments (department_name)
VALUES ("Cardiology"),
       ("Neurology"),
       ("Radiology"),
       ("Pathology"),
       ("Nursing"),
       ("Pharmacy"),
       ("Administratior");

INSERT INTO roles (title, salary, department_id)
VALUES ("Cardiologist", 90000, 1),
       ("Neurologist", 90000, 2),
       ("Radiologist", 52000, 3),
       ("Pathologist", 65000, 4),
       ("Pharmacist", 410000, 6),
       ("Home Care Registered Nurse", 35000, 5),
       ("Surgical Registered Nurse", 40000, 5),
       ("Emergency Room Nurse", 35000, 5),
       ("HR", 90000, 7),
       ("Administrator", 35000, 7),
       ("Manager", 50000, 7);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Mariya", "Engleman", 1, null ),
       ("Michael", "Thurmond", 2, 1),
       ("Josh", "White", 3, 1),
       ("Jacob", "Stone", 4, 1),
       ("Keit", "Markus", 5, 1),
       ("Ramy", "Nixon", 6, 1),
       ("Logan", "Relly", 7, 1),
       ("Michelle", "Pucket", 8, 1),
       ("Morgan", "Ivanova", 9, 1),
       ("Stacy", "Boley", 10, 1),
       ("Nivishi", "Edwards", 11, 1),
       ("Myrtia", "Hall", 5, 1);


