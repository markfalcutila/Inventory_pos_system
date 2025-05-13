import { Role } from "../entity/Role";
import { Request, Response } from "express";

export class RoleController { 

    // get all roles
    async getRoles(req: Request, res: Response){
        try{
            const roles = await Role.find();
            res.json(roles);
            console.log("Roles fetched successfully:", roles);

        } catch(error){
            res.status(500).json({ message: "Error fetching roles", error });
            console.error("Error fetching roles:", error);
        }
    }

    // get single role
    
    async getRoleById(req: Request, res: Response){
        const { id } = req.body;
        console.log("getRoleById id:", id);
        try{
            const role = await Role.findOneBy({ id: Number(id)} );
            if (role){
                res.json(role);
                res.status(200).json({"code": "200", "message": "Role fetched successfully", role});
                console.log("Role fetched successfully:", role);
            } else{
                res.status(404).json({ message: "Role not found" });
                console.log("Role not found:", id);
            }

        } catch(error){
            res.status(500).json({ message: "Error fetching role", error });
            console.error("Error fetching role:", error);
        }
    }

    // create roles 
    async createRole(req: Request, res: Response){
        try{
            const { name, permissions } = req.body;
            const newRole = Role.create({ name, permissions})
            const findRole = await Role.findOneBy({ name: name});
            console.log("findRole:", findRole);
            if (findRole){
                res.status(409).json({ message: "Role already exists" });
                console.log("Role already exists:", name);
                return;
            }
            else{
                await newRole.save();
                res.status(201).json({"code": "201", "message": "Role created successfully", newRole});
                console.log("Role created successfully:", newRole);
            }

        } catch(error){ 
            res.status(500).json({ message: "Error creating role", error });
            console.error("Error creating role:", error);
        }
    }

    // edit role 

    async editRole(req: Request, res: Response){
        const { id, name, permissions } = req.body;

        try{
            const role = await Role.findOneBy({ id: Number(id)} );
            if (role){
                role.name = name;
                role.permissions = permissions;
                await role.save();
                res.status(200).json({"code": "200", "message": "Role updated successfully", role});
                console.log("Role updated successfully:", role);
            } else{
                res.status(404).json({ message: "Role not found" });
                console.log("Role not found:", id);
            }

        } catch(error){
            res.status(500).json({ message: "Error updating role", error });
            console.error("Error updating role:", error);
        }
    }

    // delete role
    async deleteRole(req: Request, res: Response){
        const { id } = req.body; 

        try{ 
            const role = await Role.findOneBy({ id: Number(id)} );
            if (role){
                await Role.delete({ id: Number(id) });
                res.status(200).json({"code": "200", "message": "Role deleted successfully"});
                console.log("Role deleted successfully:", id);
            }else{
                res.status(404).json({ message: "Role not found" });
                console.log("Role not found:", id);
            }

        } catch(error){ 
            res.status(500).json({ message: "Error deleting role", error });
            console.error("Error deleting role:", error);
        }
    }
}