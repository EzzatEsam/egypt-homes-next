"use client";

import { AuthService } from "@/lib/AuthService";
import { useEffect, useState } from "react";

function UseAuth() {
  const authService = new AuthService();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
        
    });

  


}

export default UseAuth;
