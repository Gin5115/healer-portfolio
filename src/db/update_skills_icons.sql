-- Update Skills to use Simple Icons (Si) naming convention for consistency
-- Run this in your Supabase SQL Editor

-- Frameworks & Libraries
UPDATE skills SET icon_name = 'SiReact' WHERE name = 'React';
UPDATE skills SET icon_name = 'SiNodedotjs' WHERE name = 'Node.js';
UPDATE skills SET icon_name = 'SiNextdotjs' WHERE name = 'Next.js';
UPDATE skills SET icon_name = 'SiTailwindcss' WHERE name = 'Tailwind CSS';
UPDATE skills SET icon_name = 'SiFlutter' WHERE name = 'Flutter';
UPDATE skills SET icon_name = 'SiDjango' WHERE name = 'Django';
UPDATE skills SET icon_name = 'SiTensorflow' WHERE name = 'TensorFlow';
UPDATE skills SET icon_name = 'SiPytorch' WHERE name = 'PyTorch';
UPDATE skills SET icon_name = 'SiFirebase' WHERE name = 'Firebase';

-- Languages
UPDATE skills SET icon_name = 'SiPython' WHERE name = 'Python';
UPDATE skills SET icon_name = 'SiJavascript' WHERE name = 'JavaScript';
UPDATE skills SET icon_name = 'SiTypescript' WHERE name = 'TypeScript';
UPDATE skills SET icon_name = 'SiDart' WHERE name = 'Dart';
UPDATE skills SET icon_name = 'SiCplusplus' WHERE name = 'C++';
UPDATE skills SET icon_name = 'SiGnubash' WHERE name = 'Linux' OR name = 'Bash';

-- Databases & Tools
UPDATE skills SET icon_name = 'SiPostgresql' WHERE name = 'PostgreSQL' OR name = 'SQL';
UPDATE skills SET icon_name = 'SiDocker' WHERE name = 'Docker';
UPDATE skills SET icon_name = 'SiPostman' WHERE name = 'Postman';
UPDATE skills SET icon_name = 'SiAmazonwebservices' WHERE name = 'AWS';

-- Verify
SELECT name, icon_name FROM skills;
