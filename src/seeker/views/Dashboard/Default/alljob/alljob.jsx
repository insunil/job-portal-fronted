import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';

// MUI
import {
  Box,
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  Pagination,
  Chip,
  CircularProgress
} from '@mui/material';

export function AllJob() {
  const [jobs, setJobs] = useState([]);
  const [experience, setExperience] = useState('');
  const [location, setLocation] = useState('');
  const [cookies] = useCookies(['seeker_token']);

  const [page, setPage] = useState(1);
  const limit = 6;
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  // ================= FETCH JOBS =================
  const fetchJobs = (pageNumber = 1) => {
    if (!cookies?.seeker_token) return;

    setLoading(true);

    axios
      .get('http://api.insunil.ind.in/jobs/me', {
        headers: {
          Authorization: `Bearer ${cookies['seeker_token']}`
        },
        params: {
          experience,
          location,
          page: pageNumber,
          limit
        }
      })
      .then((res) => {
        setJobs(res.data.jobs || []);
        setTotal(res.data.total || 0);
        setPage(pageNumber);
      })
      .catch((err) => {
        alert(err.response?.data?.message || 'Failed to fetch jobs');
        setJobs([]);
      })
      .finally(() => setLoading(false));
  };

  // ================= INITIAL LOAD =================
  useEffect(() => {
    fetchJobs(1);
  }, []);

  const totalPages = Math.ceil(total / limit);

  // ================= LOADING STATE =================
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      {/* ================= FILTERS ================= */}
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel>Experience</InputLabel>
            <Select
              value={experience}
              label="Experience"
              onChange={(e) => setExperience(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="0">Fresher</MenuItem>
              <MenuItem value="1">Upto 1 Year</MenuItem>
              <MenuItem value="2">Upto 2 Years</MenuItem>
              <MenuItem value="3">Upto 3 Years</MenuItem>
              <MenuItem value="4">Upto 4 Years</MenuItem>
              <MenuItem value="5">Upto 5 Years</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel>Location</InputLabel>
            <Select
              value={location}
              label="Location"
              onChange={(e) => setLocation(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="remote">Remote</MenuItem>
              <MenuItem value="hybrid">Hybrid</MenuItem>
              <MenuItem value="onsite">Onsite</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={2}>
          <Button
            fullWidth
            variant="contained"
            sx={{ height: '56px' }}
            onClick={() => fetchJobs(1)}
          >
            Search
          </Button>
        </Grid>
      </Grid>

      {/* ================= EMPTY STATE ================= */}
      {!loading && jobs.length === 0 && (
        <Box textAlign="center" mt={5}>
          <Typography variant="h5" color="error">
            Job not available
          </Typography>
          <Typography color="text.secondary">
            Try changing experience or location filter
          </Typography>
        </Box>
      )}

      {/* ================= JOB LIST ================= */}
      <Grid container spacing={3}>
        {jobs.map((job) => (
          <Grid item xs={12} md={4} key={job._id}>
            <Card elevation={3}>
              <CardHeader title={job.name} />

              <CardContent>
                <Stack spacing={1}>
                  <Typography>
                    Experience: <strong>{job.experience} years</strong>
                  </Typography>

                  <Typography>
                    Salary: <strong>₹ {job.salary}</strong>
                  </Typography>

                  {/* ✅ FIXED DOM STRUCTURE */}
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography>Location:</Typography>
                    <Chip label={job.location} size="small" color="primary" />
                  </Stack>
                </Stack>
              </CardContent>

              <CardActions sx={{ justifyContent: 'space-between', px: 2 }}>
                <Typography variant="caption">
                  Apply before {job.date}
                </Typography>

                {job.isApplied ? (
                  <Button disabled variant="outlined">
                    Applied
                  </Button>
                ) : (
                  <Button
                    component={Link}
                    to={`/seeker-dashboard/job-details/${job._id}`}
                    variant="contained"
                    color="success"
                  >
                    Apply
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* ================= PAGINATION ================= */}
      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, value) => fetchJobs(value)}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
}
