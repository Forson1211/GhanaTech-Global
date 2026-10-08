# MongoDB Atlas setup for GhanaTech Global

Production project: `ghanatech-global-iu6d`, serving `https://ghanatechglobal.vercel.app`. Resend setup is deferred at the user's request; leave email delivery disabled until a sender/provider is configured.

1. Sign up at https://cloud.mongodb.com/ and create a project named **GhanaTech Global**.
2. Create a **Free** cluster named `ghanatech-global` for initial setup and testing. Choose AWS and an available region; Northern Virginia aligns with the current default Vercel build region. Do not load sample data. Review the hosting/database capacity and backup needs before treating a Free cluster as your long-term production database.
3. In **Database Access**, create `ghanatech_app`, using an Atlas-generated password. Assign `readWrite` on the database `ghanatech_global` through specific privileges. Keep its password private.
4. In **Network Access**, add an entry for the Vercel deployment. With Vercel's default dynamic outbound IPs, Atlas documents using `0.0.0.0/0`. This permits connection attempts from any IP, so use strong database-only credentials restricted to this application's database. A deployment with configured static outbound IPs can use those narrower addresses instead.
5. Open the cluster's **Connect > Drivers**, choose **Node.js**, and copy the connection string. Replace its username/password placeholders and set the database name before the query string:

   ```text
   mongodb+srv://ghanatech_app:ENCODED_PASSWORD@YOUR_CLUSTER.mongodb.net/ghanatech_global?retryWrites=true&w=majority
   ```

   Keep Atlas's actual hostname and query options. URL-encode special characters in the password. The database is created when application setup first writes to it.
6. In https://vercel.com/forson-odonkors-projects/ghanatech-global-iu6d/settings/environment-variables add **MONGODB_URI** with that complete URI for **Production**. Save it as a sensitive value if that option is available. Do not paste it into chat or commit it to Git. Use a separate database for previews.
7. Tell the assistant when the variable is saved, provide the intended administrator email (no password), and approve the pending production settings when asked. The database must then be checked, indexes initialized without demo seeding, an administrator created, and the configured build deployed and verified. Saving an environment variable alone does not update an existing deployment.

References: [Atlas Free cluster setup](https://www.mongodb.com/docs/atlas/tutorial/deploy-free-tier-cluster/), [database users](https://www.mongodb.com/docs/atlas/security-add-mongodb-users/), [Vercel integration and dynamic IP access](https://www.mongodb.com/docs/atlas/reference/partner-integrations/vercel/), [connecting to Atlas](https://www.mongodb.com/docs/atlas/connect-to-database-deployment/).
