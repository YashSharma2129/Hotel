import React from 'react';

import { Link } from 'react-router-dom';
import {FaRegMeh} from 'react-icons/fa';

export default function Error() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <Link to="/">Return Home</Link>
    </div>
  );
}
