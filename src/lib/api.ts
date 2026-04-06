import { sql } from './neon';

export const api = {
  auth: {
    register: async (email, password, name) => {
      try {
        const trialUntil = new Date();
        trialUntil.setMonth(trialUntil.getMonth() + 4); // 4 months free

        const result = await sql`
          INSERT INTO users (email, password, name, trial_until, current_plan)
          VALUES (${email}, ${password}, ${name}, ${trialUntil}, 'trial')
          RETURNING id, email, name, role, current_plan, trial_until
        `;
        return { success: true, user: result[0] };
      } catch (err) {
        console.error("Registration error:", err);
        return { success: false, error: err.message || "Registration failed" };
      }
    },
    login: async (email, password) => {
      try {
        const result = await sql`
          SELECT * FROM users WHERE email = ${email} AND password = ${password}
        `;
        if (result.length > 0) {
          return { success: true, user: result[0] };
        }
        return { success: false, error: "Invalid credentials" };
      } catch (err) {
        return { success: false, error: err.message };
      }
    }
  },
  products: {
    list: async (category = null) => {
      try {
        if (category) {
          return await sql`SELECT * FROM products WHERE category = ${category}`;
        }
        return await sql`SELECT * FROM products ORDER BY created_at DESC`;
      } catch (err) {
        console.error("List products error:", err);
        return [];
      }
    },
    get: async (slug) => {
      try {
        const result = await sql`SELECT * FROM products WHERE slug = ${slug}`;
        return result[0];
      } catch (err) {
        return null;
      }
    }
  },
  investments: {
    listProjects: async () => {
      try {
        return await sql`SELECT * FROM investment_projects ORDER BY progress DESC`;
      } catch (err) {
        return [];
      }
    }
  },
  academy: {
    listCourses: async () => {
      try {
        return await sql`SELECT * FROM courses ORDER BY level ASC`;
      } catch (err) {
        return [];
      }
    }
  }
};
